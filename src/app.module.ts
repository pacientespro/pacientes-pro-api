import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from 'src/modules/usuarios/usuario.module';
import { TiposProfesionesModule } from 'src/modules/tipo-profesiones/tipo-profesiones.module';
import { TiposDocumentosModule } from 'src/modules/tipo-documentos/tipo-documentos.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CommonModule,
    UsuariosModule,
    TiposProfesionesModule,
    TiposDocumentosModule,
    AuthModule,
    ProfessionalsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
