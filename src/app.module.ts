import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { log } from './utils'
import { LoggerMiddleware } from './middleware/log.middleware'
import { TodosModule } from './todos/todos.module'
import { TodosController } from './todos/todos.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_FILTER } from '@nestjs/core'
import { AllExceptionsFilter } from './filters'

@Module({
  // 导入这些模块的提供者
  imports: [
    TypeOrmModule.forRoot(),
    TodosModule,
    // AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  controllers: [],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(TodosController)
  }
}
