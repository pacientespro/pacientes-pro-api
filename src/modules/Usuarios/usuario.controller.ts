import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { UsuariosService } from "./usuario.service";
import { CreateUserDto } from "./dto/requests/create-user.dto";

@Controller('api/usuarios')
export class UsuariosController{
    constructor(private service: UsuariosService){}

    @Get('hello-world')
    @ApiOperation({summary: 'example'})
    async Hello(@Res() response){
        return response.status(200).send('Hola mundo');
    }

    @Post()
    @ApiOperation({summary: 'Creacion de usuarios'})
    @ApiBody({type: CreateUserDto})
    async CreateUser(@Body() payload: CreateUserDto,@Res() response){
        const res = await this.service.CreateUser(payload);
        return response.status(res.code).send(res);
    }
}

