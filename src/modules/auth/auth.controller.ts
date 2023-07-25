import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "./dto/requests/login.dto";
import { AuthMiddleware } from "src/common/middleware/auth.middleware";

@Controller('api/auth')
export class AuthController {
  constructor(private readonly service: AuthService) { }


  @Post('login')
  @ApiOperation({ summary: 'Metodo de login, inicio de sesion' })
  @ApiBody({ type: LoginDto })
  async loginUser(@Body() payload: LoginDto, @Res() response) {
    const res = await this.service.login(payload);
    return response.status(res.code).send(res);
  }

  @Get('logged')
  @UseGuards(AuthMiddleware)
  @ApiOperation({ summary: 'Obtiene informacion de usuario logueado' })
  async getLogged(@Req() request, @Res() response) {

    const res = await this.service.getLoggedUser(request.claims.email, request.claims.userId);
    return response.status(res.code).send(res);
  }
}
