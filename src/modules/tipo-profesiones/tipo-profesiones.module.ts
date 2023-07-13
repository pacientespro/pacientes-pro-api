import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TipoProfesiones } from "./entities/tipo-profesiones.entity";
import { TiposProfesionesService } from "./tipo-profesiones.service";
import { TiposProfesionesController } from "./tipo-profesiones.controller";
import { CommonModule } from "src/common/common.module";

@Module({
    imports: [TypeOrmModule.forFeature([TipoProfesiones]), CommonModule],
    providers: [TiposProfesionesService],
    controllers: [TiposProfesionesController],
    exports: [TiposProfesionesService]
})

export class TiposProfesionesModule { }