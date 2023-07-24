import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/common/logger/logger.service';
import { ServiceResponse } from 'src/common/utils/services-response';
import { hash } from 'bcrypt';
import { CreateUserDto } from './requests/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
        private readonly _logger: LoggerService

    ) { }


    public async CreateUser(payload: CreateUserDto): Promise<ServiceResponse> {
        try {
            const validateUser = await this.GetByUser(payload.Correo);
            if (validateUser.code !== HttpStatus.NOT_FOUND) {
                return new ServiceResponse(HttpStatus.BAD_REQUEST, "Ya existe un registro con este correo", {Correo: payload.Correo});
            }
            const entity = Object.assign(new Usuario(), { ...payload, IsActive: true });    
            entity.Clave = await hash(payload.Clave, 10);

            const result = await this.usuarioRepo.save(entity);
            this._logger.info(`UsuariosService: Usuario ${payload.Correo} creado correctamente`);
            return new ServiceResponse(HttpStatus.OK, "Usuario creado", { Usuario: payload.Correo, Id: result.id});
        } catch (error) {
            this._logger.error(`CreateUser: Error no controlado ${error}`);
            throw error;
        }
    }

    public async GetByUser(usuario: string): Promise<ServiceResponse> {
        try {
            const user = await this.usuarioRepo.findOne({ where: { IsActive: true, Correo: usuario } });
            if (user) {
                return new ServiceResponse(HttpStatus.OK, "", user);
            } else {
                return new ServiceResponse(HttpStatus.NOT_FOUND, "El usuario especificado no existe", null);
            }
        } catch (error) {
            this._logger.error(`GetByUser: Error no controlado ${error}`);
            throw error;
        }
    }

}
