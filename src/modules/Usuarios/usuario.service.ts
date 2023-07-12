import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/requests/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { Repository } from "typeorm";
import { ServiceResponse } from "src/common/utils/services-response";

@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>
    ) { }


    public async CreateUser(payload: CreateUserDto): Promise<ServiceResponse> {
        try {
            const entity = Object.assign(new Usuario(), { ...payload, IsActive: true });
            await this.usuarioRepo.save(entity);
            console.info('Usuario creado');
            return new ServiceResponse(HttpStatus.OK, "Usuario creado", entity);
        } catch (error) {
            console.error(`Error no controlado ${error}`);
            throw error;
        }

    }

}