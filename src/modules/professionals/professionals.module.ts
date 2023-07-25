import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesionales } from './entities/profesional.entity';
import { TiposDocumentosModule } from '../tipo-documentos/tipo-documentos.module';
import { TiposProfesionesModule } from '../tipo-profesiones/tipo-profesiones.module';
import { UsersModule } from '../users/users.module';
import { HelperModule } from 'src/common/helper/helper.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Profesionales]),
    UsersModule,
    HelperModule,
    TiposDocumentosModule,
    TiposProfesionesModule
],
  providers: [ProfessionalsService],
  controllers: [ProfessionalsController],
  exports: [ProfessionalsService]
})
export class ProfessionalsModule {}
