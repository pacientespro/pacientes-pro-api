import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServiceResponse } from "src/common/utils/services-response";
import { TipoProfesiones } from "./entities/tipo-profesiones.entity";
import { LoggerService } from "src/common/logger/logger.service";

@Injectable()
export class TiposProfesionesService {

    constructor(
        @InjectRepository(TipoProfesiones)
        private readonly repo: Repository<TipoProfesiones>,
        private readonly _logger: LoggerService

    ) { }


    public async GetAll(): Promise<ServiceResponse> {
        try {
            const types = await this.repo.find({ where: { IsActive: true } });
            return new ServiceResponse(HttpStatus.OK, "", types);
        } catch (error) {
            this._logger.error(`TiposProfesiones: Error no controlado ${error}`);
            throw error;
        }
    }

    public async GetById(id: number): Promise<ServiceResponse> {
        try {
            const type = await this.repo.findOne({ where: { IsActive: true, id: id } });
            if (type) {
                return new ServiceResponse(HttpStatus.OK, "", type);
            } else {
                return new ServiceResponse(HttpStatus.NOT_FOUND, "El tipo de profesion especificado no existe", null);
            }
        } catch (error) {
            this._logger.error(`TiposProfesiones: Error no controlado ${error}`);
            throw error;
        }
    }

}