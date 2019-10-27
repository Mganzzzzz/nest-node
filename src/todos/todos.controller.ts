import { Controller, Get, Post, Body, Param, Query, UseInterceptors } from '@nestjs/common'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodosService } from './todos.service'
import { TodoInterface } from './interface/todo.interface'
import { CreateTodoDto } from './dto/create-todo.dto'
import { ValidationPipe } from '../pipe/validation.pipe'
import { ModelFilterInterceptor, ModelFilterInterFace } from '../interceptor'
import { TransformInterceptor } from '../interceptor/transform.interceptor'
import { log } from '../utils'

interface ResponsTodo {
  task: string
}
@Controller('todos')
@UseInterceptors(TransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {
  }

  @Get('all')
  async all(@Query('pageSize') pageSize: number, @Query('pageNo') pageNo: number): Promise<TodoInterface[]> {
    return await this.todosService.findAll(pageNo, pageSize)
  }

  @Get('find')
  async findBy(@Query('pageSize') pageSize: number, @Query('pageNo') pageNo: number, @Query() querys): Promise<TodoInterface[]> {
    return await this.todosService.findBy(pageNo, pageSize, querys)
  }

  @Get('delete/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.todosService.delete(id)
  }

  @Post('create')
  async create(@Body(new ValidationPipe()) t: CreateTodoDto): Promise<TodoInterface> {
    return await this.todosService.create(t)
  }

  @Post('update/:id')
  async update(@Param('id') id: number, @Body() todo: UpdateTodoDto): Promise<TodoInterface> {
    return await this.todosService.update(id, todo)
  }

  @Get('complete/:id')
  async completeTodo(@Param('id') id: number): Promise<void> {
    return await this.todosService.complete(id)
  }
}
