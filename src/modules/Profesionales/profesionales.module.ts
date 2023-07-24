import { Module } from "@nestjs/common";
import { ProfesionalesService } from "./profesionales.service";
import { ProfesionalesController } from "./profesionales.controller";
import { AuthModule } from "../auth/auth.module";
import { TiposDocumentosModule } from "../tipo-documentos/tipo-documentos.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profesionales } from "./entities/profesional.entity";
import { TiposProfesionesModule } from "../tipo-profesiones/tipo-profesiones.module";
import { UsuariosModule } from "src/modules/usuarios/usuario.module";
import { CommonModule } from "src/common/common.module";

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([Profesionales]),
        UsuariosModule,
        AuthModule,
        TiposDocumentosModule,
        TiposProfesionesModule
    ],
    providers: [ProfesionalesService],
    controllers: [ProfesionalesController]
})

export class ProfesionalesModule { }