import { Controller, Get, Res } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { TiposDocumentosService } from "./tipo-documentos.service";

@Controller('api/documentos')
export class TiposDocumentosController{
    constructor(private service: TiposDocumentosService){}

    @Get('get-all')
    @ApiOperation({summary: 'Obtener todos los tipos de documentos'})
    async getDocumentos(@Res() response){
        const res = await this.service.GetAll();
        return response.status(res.code).send(res);
    } 
}