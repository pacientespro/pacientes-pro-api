import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './common/swagger/swagger.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  setupSwagger(app);
  if (configService.get('ENABLE_DOCUMENTATION') === 'true') {
 
  }
  
  app.enableCors();
  const port = configService.get('PORT') || 3999;
  await app.listen(port, () => console.info(`Listening on port ${port}`));

}
bootstrap();
