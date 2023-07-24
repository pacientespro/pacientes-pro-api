import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { ProfesionalesModule } from 'src/modules/profesionales/profesionales.module';
import { UsuariosModule } from 'src/modules/usuarios/usuario.module';
import { TiposProfesionesModule } from 'src/modules/tipo-profesiones/tipo-profesiones.module';
import { TiposDocumentosModule } from 'src/modules/tipo-documentos/tipo-documentos.module';
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
