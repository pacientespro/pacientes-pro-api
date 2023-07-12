import { Module } from "@nestjs/common";
import { UsuariosService } from "./usuario.service";
import { UsuariosController } from "./usuario.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuariosService],
    controllers: [UsuariosController]
})

export class UsuariosModule { }