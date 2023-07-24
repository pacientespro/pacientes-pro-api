import { HttpStatus, Injectable } from '@nestjs/common';
import { TiposDocumentosService } from '../tipo-documentos/tipo-documentos.service';
import { TiposProfesionesService } from '../tipo-profesiones/tipo-profesiones.service';
import { UsuariosService } from '../usuarios/usuario.service';
import { AuthService } from '../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesionales } from './entities/profesional.entity';
import { Repository } from 'typeorm';
import { SignUpProfesionalDto } from './dto/request/signup-profesional.dto';
import { ServiceResponse } from 'src/common/utils/services-response';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class ProfessionalsService {
    constructor(
        private readonly _serviceDocsTypes: TiposDocumentosService,
        private readonly _serviceProfesionsTypes: TiposProfesionesService,
        private readonly _serviceUsers: UsuariosService,
        private readonly _auth: AuthService,
        @InjectRepository(Profesionales)
        private readonly repo: Repository<Profesionales>,
        private readonly _logger: LoggerService
    ) {

    }
    public async SignUp(payload: SignUpProfesionalDto): Promise<ServiceResponse> {
        try {
            const validateDocument = await this._serviceDocsTypes.GetById(payload.IdTipoDocumento);
            if (!validateDocument.isSucceded) {
                return validateDocument;
            }

            const validateProfesion = await this._serviceProfesionsTypes.GetById(payload.IdProfesion);
            if (!validateProfesion) {
                return validateProfesion;
            }
            const createdUser = await this._serviceUsers.CreateUser({ Correo: payload.Correo, Clave: payload.Clave });
            if (!createdUser.isSucceded) {
                return createdUser;
            }

            const entity = Object.assign(new Profesionales(), { ...payload, IsDeleted: false, IdUsuario: createdUser.content.Id });
            const profesional = await this.repo.save(entity);
            const token = await this._auth.generateToken({ user: payload.Correo, userId: createdUser.content.Id });
            this._logger.info(`Se ha registrado en profesionales el correo ${payload.Correo} correctamente`);
            return new ServiceResponse(HttpStatus.OK, "Cuenta creada correctamente", { token });
        } catch (error) {
            this._logger.error(`Profesionales-SignUp: Error no controlado ${error}`);
            throw error;
        }

    }
}
