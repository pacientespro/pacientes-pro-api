import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './common/swagger/swagger.module';
import { ValidationPipe } from '@nestjs/common';
const morgan = require("morgan");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan("tiny"));
  app.enableCors();

  const configService = app.get(ConfigService);
  if (configService.get('ENABLE_DOCUMENTATION') === 'true') {
    setupSwagger(app);
  }
  
  const port = configService.get('PORT') || 3999;
  await app.listen(port, () => console.info(`Listening on port ${port}`));

}
bootstrap();
