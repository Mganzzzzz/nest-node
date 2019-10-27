import { PipeTransform, ArgumentMetadata, HttpStatus, BadRequestException, Injectable } from '@nestjs/common'
import { isNaN } from '../utils'
import { TransformFailException,  } from '../exception'

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new TransformFailException('')
    }
    return val
  }
}
