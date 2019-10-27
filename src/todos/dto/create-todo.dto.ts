import { IsString, IsInt } from 'class-validator'

export class CreateTodoDto {
  @IsString()
  readonly task: string

  @IsInt()
  readonly orderNo: number
}
