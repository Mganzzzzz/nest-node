import { HttpException, HttpStatus } from '@nestjs/common'

// 重复操作
export class RepetitiveException extends HttpException {
  constructor() {
    super( {msg: 'RepetitiveException', status: '305'}, HttpStatus.OK)
  }
}
