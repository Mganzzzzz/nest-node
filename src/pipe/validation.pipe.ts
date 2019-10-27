import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { ValidateFailException } from '../exception'
import { log } from '../utils'

interface Foo {
  a: number
  b: string
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new ValidateFailException(errors)
    }
    return value
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    const r = !types.find((type) => metatype === type)
    return r
  }
}
