import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { ProfesionalesService } from "./profesionales.service";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { SignUpProfesionalDto } from "./dto/request/signup-profesional.dto";

@Controller('api/profesionales')
export class ProfesionalesController{
    constructor(private service: ProfesionalesService){}
    
    @Post('sign-up')
    @ApiOperation({summary: 'Creacion de Profesional mediante signup'})
    @ApiBody({type: SignUpProfesionalDto})
    async CreateUser(@Body() payload: SignUpProfesionalDto,@Res() response){
        const res = await this.service.SignUp(payload);
        return response.status(res.code).send(res);
    }

}