import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { AppModule } from './app.module'
import { log } from './utils'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.listen(3000)
  log('app run at http://localhost:3000')
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
