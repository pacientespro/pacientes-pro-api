import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TiposProfesionesModule } from 'src/modules/tipo-profesiones/tipo-profesiones.module';
import { TiposDocumentosModule } from 'src/modules/tipo-documentos/tipo-documentos.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { UsersModule } from './modules/users/users.module';
import { HelperModule } from './common/helper/helper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CommonModule,
    TiposProfesionesModule,
    TiposDocumentosModule,
    AuthModule,
    ProfessionalsModule,
    UsersModule,
    HelperModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
