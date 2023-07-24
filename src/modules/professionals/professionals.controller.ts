import { Body, Controller, Post, Res } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SignUpProfesionalDto } from './dto/request/signup-profesional.dto';

@Controller('api/professionals')
export class ProfessionalsController {
    constructor(private service: ProfessionalsService){}

    @Post('sign-up')
    @ApiOperation({summary: 'Creacion de Profesional mediante signup'})
    @ApiBody({type: SignUpProfesionalDto})
    async CreateUser(@Body() payload: SignUpProfesionalDto,@Res() response){
        const res = await this.service.SignUp(payload);
        return response.status(res.code).send(res);
    }

}
