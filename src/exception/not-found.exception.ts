import { HttpException, HttpStatus } from '@nestjs/common'

export class ResourceNotFounException extends HttpException {
  constructor() {
    super( {msg: 'ResourceNotFoundException', status: '400'}, HttpStatus.OK)
  }
}
