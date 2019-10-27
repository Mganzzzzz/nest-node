import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus, HttpException } from '@nestjs/common'
import { log } from '../utils'
import { ValidateFailException } from '../exception'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // super.catch(exception, host)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    console.log('catch All exception', exception)
    let status
    let msg
    if (exception instanceof ValidateFailException) {
      status = '403'
      msg = exception.message.msg
    } else if (exception instanceof HttpException) {
      status = exception.getStatus()
      msg = exception.message.message || exception.message.msg
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      msg = '未知错误'
    }

    response
      .status(HttpStatus.OK)
      .json({
        msg,
        status,
      })
  }
}
