import { HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/requests/login.dto";
import { ServiceResponse } from "src/common/utils/services-response";
import { compare } from 'bcrypt';
import { LoggerService } from "src/common/logger/logger.service";
import { UsersService } from "../users/users.service";
import { TokenService } from "src/common/helper/token.service";
import { ProfessionalsService } from "../professionals/professionals.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly tokenService: TokenService,
        private readonly _serviceUsers: UsersService,
        private readonly _profesionalService: ProfessionalsService,
        private readonly _logger: LoggerService

    ) { }

    async login(payload: LoginDto): Promise<ServiceResponse> {
        try {
            const user = await this._serviceUsers.GetByUser(payload.Correo);
            if (!user.isSucceded) {
                return new ServiceResponse(HttpStatus.UNAUTHORIZED, "Usuario o clave incorrectos", null);
            }
            const isValid = await compare(payload.Clave, user.content.Clave);
            if (!isValid) {
                return new ServiceResponse(HttpStatus.UNAUTHORIZED, "Usuario o clave incorrectos", null);
            }
            const token = await this.tokenService.generateToken({ email: payload.Correo, userId: user.content.id })
            return new ServiceResponse(HttpStatus.OK, "Usuario logueado correctamente", { token })
        } catch (error) {
            this._logger.error(`Profesionales-SignUp: Error no controlado ${error}`);
            throw error;
        }

    }

    async getLoggedUser(email: string, userId: number): Promise<ServiceResponse> {
        const profesional = await this._profesionalService.getProfesionalData(userId);
        return new ServiceResponse(HttpStatus.OK, "Usuario logueado correctamente", profesional.content);

    }
}
