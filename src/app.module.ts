import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { ProfesionalesModule } from './modules/profesionales/profesionales.module';
import { UsuariosModule } from './modules/usuarios/usuario.module';
import { TiposProfesionesModule } from './modules/tipo-profesiones/tipo-profesiones.module';
import { TiposDocumentosModule } from './modules/tipo-documentos/tipo-documentos.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CommonModule,
    ProfesionalesModule,
    UsuariosModule,
    TiposProfesionesModule,
    TiposDocumentosModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
