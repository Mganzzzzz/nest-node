import { HttpException, HttpStatus } from '@nestjs/common'

export class TransformFailException extends HttpException {
  constructor(field: string, msg?: string) {
    super({ msg: `transform ${field} fail ${msg}`, status: '303' }, HttpStatus.OK)
  }
}
