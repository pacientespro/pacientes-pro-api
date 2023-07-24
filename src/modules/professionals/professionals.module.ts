import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesionales } from './entities/profesional.entity';
import { AuthModule } from '../auth/auth.module';
import { TiposDocumentosModule } from '../tipo-documentos/tipo-documentos.module';
import { TiposProfesionesModule } from '../tipo-profesiones/tipo-profesiones.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Profesionales]),
    UsersModule,
    AuthModule,
    TiposDocumentosModule,
    TiposProfesionesModule
],
  providers: [ProfessionalsService],
  controllers: [ProfessionalsController]
})
export class ProfessionalsModule {}
