import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/requests/login.dto";
import { ServiceResponse } from "src/common/utils/services-response";
import { compare } from 'bcrypt';
import { LoggerService } from "src/common/logger/logger.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly _serviceUsers: UsersService,
        private readonly _logger: LoggerService

    ) { }

    async generateToken(payload: any): Promise<string> {
        return this.jwtService.sign(payload);
    }

    async verifyToken(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }

    async login(payload: LoginDto): Promise<ServiceResponse> {
        try {
            const user = await this._serviceUsers.GetByUser(payload.Correo);
            if (!user) {
                return new ServiceResponse(HttpStatus.UNAUTHORIZED, "Usuario o clave incorrectos", null);
            }
            const isValid = await compare(payload.Clave, user.content.Clave);
            if (!isValid) {
                return new ServiceResponse(HttpStatus.UNAUTHORIZED, "Usuario o clave incorrectos", null);
            }
            const token = await this.generateToken({ user: payload.Correo, userId: user.content.Id })
            return new ServiceResponse(HttpStatus.OK,"Usuario logueado correctamente", {token}) 
        } catch (error) {
            this._logger.error(`Profesionales-SignUp: Error no controlado ${error}`);
            throw error;
        }
        
    }
}
