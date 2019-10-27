import { HttpException, HttpStatus } from '@nestjs/common'

export class ValidateFailException extends HttpException {
  constructor(errors) {
    super({ msg: 'ValidateFailException' + errors, status: '403' }, HttpStatus.OK)
  }
}
