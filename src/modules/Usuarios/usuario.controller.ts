import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { UsuariosService } from "./usuario.service";
import { CreateUserDto } from "./dto/requests/create-user.dto";

@Controller('api/usuarios')
export class UsuariosController{
    constructor(private service: UsuariosService){}
}

