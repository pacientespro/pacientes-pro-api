import { Controller, Get, Res } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { TiposProfesionesService } from "./tipo-profesiones.service";

@Controller('api/profesiones')
export class TiposProfesionesController{
    constructor(private service: TiposProfesionesService){}

    @Get('get-all')
    @ApiOperation({summary: 'Obtener todos los tipos de profesiones'})
    async getDocumentos(@Res() response){
        const res = await this.service.GetAll();
        return response.status(res.code).send(res);
    } 
}