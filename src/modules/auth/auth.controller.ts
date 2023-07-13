import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "./dto/requests/login.dto";

@Controller('api/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}


  @Post('login')
  @ApiOperation({summary: 'Metodo de login, inicio de sesion'})
  @ApiBody({type: LoginDto})
  async CreateUser(@Body() payload: LoginDto,@Res() response){
      const res = await this.service.login(payload);
      return response.status(res.code).send(res);
  }
}
