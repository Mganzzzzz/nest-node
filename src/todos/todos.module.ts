import { Module } from '@nestjs/common'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'
import { Todo } from './todo.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModelFilterInterceptor } from '../interceptor'

@Module({
  providers: [TodosService],
  controllers: [TodosController],
  imports: [TypeOrmModule.forFeature([Todo])],
  // exports: [TodosService],
})
export class TodosModule {
}
