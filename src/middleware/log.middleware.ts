import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { log } from 'util'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    next()
  }
}
