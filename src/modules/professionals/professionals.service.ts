import { HttpStatus, Injectable } from '@nestjs/common';
import { TiposDocumentosService } from '../tipo-documentos/tipo-documentos.service';
import { TiposProfesionesService } from '../tipo-profesiones/tipo-profesiones.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesionales } from './entities/profesional.entity';
import { Repository } from 'typeorm';
import { SignUpProfesionalDto } from './dto/request/signup-profesional.dto';
import { ServiceResponse } from 'src/common/utils/services-response';
import { LoggerService } from 'src/common/logger/logger.service';
import { UsersService } from '../users/users.service';
import { TokenService } from 'src/common/helper/token.service';
import { ProfesionalInfoDTO } from './dto/profesional-data.dto';
import { QuerysEnum } from 'src/common/database/queries.enum';

@Injectable()
export class ProfessionalsService {
    constructor(
        private readonly _serviceDocsTypes: TiposDocumentosService,
        private readonly _serviceProfesionsTypes: TiposProfesionesService,
        private readonly _serviceUsers: UsersService,
        private readonly _tokenService: TokenService,
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
            await this.repo.save(entity);
            const token = await this._tokenService.generateToken({ user: payload.Correo, userId: createdUser.content.Id });
            this._logger.info(`Se ha registrado en profesionales el correo ${payload.Correo} correctamente`);
            return new ServiceResponse(HttpStatus.OK, "Cuenta creada correctamente", { token });
        } catch (error) {
            this._logger.error(`Profesionales-SignUp: Error no controlado ${error}`);
            throw error;
        }

    }

    public async getByUserId(userId: number): Promise<ServiceResponse> {
        const profesional = await this.repo.findOne({ where: { IsDeleted: false, IdUsuario: userId } });
        if (profesional) {
            return new ServiceResponse(HttpStatus.OK, "", profesional);
        } else {
            return new ServiceResponse(HttpStatus.NOT_FOUND, "El usuario especificado no existe", null);
        }
    }

    public async getProfesionalData(userId: number) {
        try {
            const query = `${QuerysEnum.GetProfesionalData} ${userId}`
            const resultadoQuery = await this.repo.query(query);
            if (resultadoQuery.length === 0) {
                return new ServiceResponse(HttpStatus.NOT_FOUND, "El usuario especificado no existe", null);
            }

            // Mapea el resultado a un objeto ProfesionalInfoDTO
            const profesionalInfo: ProfesionalInfoDTO = resultadoQuery[0];

            return new ServiceResponse(HttpStatus.OK, "", profesionalInfo);
        } catch (error) {
            this._logger.error(`Profesionales-getProfesionalData: Error no controlado ${error}`);
            throw error;
        }
    }
}
