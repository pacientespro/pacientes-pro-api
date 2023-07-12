import { Controller, Get, Res } from "@nestjs/common";
import { ProfesionalesService } from "./profesionales.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller('api/profesionales')
export class ProfesionalesController{
    constructor(private service: ProfesionalesService){}

    @Get('hello-world')
    @ApiOperation({summary: 'example'})
    async Hello(@Res() response){
        return response.status(200).send('Hola mundo');
    }
}