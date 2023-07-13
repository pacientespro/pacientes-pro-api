import { Module } from "@nestjs/common";
import { UsuariosService } from "./usuario.service";
import { UsuariosController } from "./usuario.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { CommonModule } from "src/common/common.module";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario]), CommonModule],
    providers: [UsuariosService],
    controllers: [UsuariosController],
    exports: [UsuariosService]

})

export class UsuariosModule { }