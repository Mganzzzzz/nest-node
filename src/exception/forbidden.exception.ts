import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbiddenException extends HttpException {
  constructor() {
    super( {msg: 'ForbiddenException', status: '403'}, HttpStatus.OK)
  }
}
