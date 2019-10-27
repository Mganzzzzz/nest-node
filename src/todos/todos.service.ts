import { TodoInterface } from './interface/todo.interface'
import { CreateTodoDto } from './dto/create-todo.dto'
import { RepetitiveException, ResourceNotFounException } from '../exception/'
import { InjectRepository } from '@nestjs/typeorm'
import { Todo } from './todo.entity'
import { Repository } from 'typeorm'
import { HttpException, HttpStatus } from '@nestjs/common'

// @Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {
  }

  async findAll(pageNo: number = 0, pageSize: number = 10): Promise<TodoInterface[]> {
    const todos: Todo[] = await this.todoRepository.createQueryBuilder()
      .where({ deleted: false })
      .skip(pageNo).take(pageSize).getMany()
    return todos.map(t => {
      const todo: TodoInterface = {
        id: t.id,
        task: t.task,
        complete: t.complete,
      }
      return todo
    })
  }

  async findBy(pageNo: number = 0, pageSize: number = 10, querys): Promise<TodoInterface[]> {
    const todos: Todo[] = await this.todoRepository.createQueryBuilder()
      .where({ ...querys, deleted: false })
      .skip(pageNo).take(pageSize).getMany()
    return todos.map(t => {
      const todo: TodoInterface = {
        id: t.id,
        task: t.task,
        complete: t.complete,
      }
      return todo
    })
  }

  async findById(id: number): Promise<Todo> {
    return await this.todoRepository.findOne(id)
  }

  async create(todo: CreateTodoDto): Promise<TodoInterface> {
    const t = new Todo()
    t.complete = false
    t.deleted = false
    t.task = todo.task
    const nt: Todo = await this.todoRepository.manager.save(t)
    return {
      id: nt.id,
      task: nt.task,
      complete: false,
    }
  }

  async update(id, todo: TodoInterface): Promise<TodoInterface> {
    const t = await this.findById(id)
    if (t) {
      Object.assign(t, todo)
      const r = await this.todoRepository.manager.save(t)
      return {
        id: r.id,
        task: r.task,
        complete: false,
      }
    } else {
      throw new ResourceNotFounException()
    }
  }

  async delete(id: number) {
    const t = await this.findById(id)
    if (t) {
      t.deleted = true
      await this.todoRepository.manager.save(t)
    } else {
      throw new ResourceNotFounException()
    }
  }

  async complete(id: number) {
    const t = await this.findById(id)
    if (t) {
      if (t.complete) {
        throw new RepetitiveException()
      }
      t.complete = true
      await this.todoRepository.manager.save(t)
    } else {
      throw new ResourceNotFounException()
    }
  }

}
