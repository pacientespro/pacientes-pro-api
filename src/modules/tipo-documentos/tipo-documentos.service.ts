import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServiceResponse } from "src/common/utils/services-response";
import { TipoDocumentos } from "./entities/tipo-documento.entity";
import { LoggerService } from "src/common/logger/logger.service";

@Injectable()
export class TiposDocumentosService {

    constructor(
        @InjectRepository(TipoDocumentos)
        private readonly repo: Repository<TipoDocumentos>,
        private readonly _logger: LoggerService

    ) { }


    public async GetAll(): Promise<ServiceResponse> {
        try {
            const types = await this.repo.find({ where: { IsActive: true } });
            return new ServiceResponse(HttpStatus.OK, "", types);
        } catch (error) {
            this._logger.error(`TiposDocumentos: Error no controlado ${error}`);
            throw error;
        }
    }

    public async GetById(id: number): Promise<ServiceResponse> {
        try {
            const type = await this.repo.findOne({ where: { IsActive: true, id: id } });
            if (type) {
                return new ServiceResponse(HttpStatus.OK, "", type);
            } else {
                return new ServiceResponse(HttpStatus.NOT_FOUND, "El tipo de documento especificado no existe", null);
            }
        } catch (error) {
            this._logger.error(`TiposDocumentos: Error no controlado ${error}`);
            throw error;
        }
    }

}