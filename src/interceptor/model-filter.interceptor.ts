import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { log } from '../utils'
import { Todo } from '../todos/todo.entity'
import { ModelFilterInterFace } from './interface';


@Injectable()
export class ModelFilterInterceptor implements NestInterceptor {
  private formatter: ModelFilterInterFace
  constructor(formatter: ModelFilterInterFace) {
    this.formatter = formatter
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')
    log(context.getClass(), context.getHandler())

    const now = Date.now()
    return next
      .handle()
      .pipe(map(value => {
        log('value', value)
        return this.formatter.filter(value)
      }))
  }
}
