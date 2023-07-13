import { Module } from "@nestjs/common";
import { TiposDocumentosService } from "./tipo-documentos.service";
import { TiposDocumentosController } from "./tipo-documentos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TipoDocumentos } from "./entities/tipo-documento.entity";
import { CommonModule } from "src/common/common.module";

@Module({
    imports: [TypeOrmModule.forFeature([TipoDocumentos]), CommonModule],
    providers: [TiposDocumentosService],
    controllers: [TiposDocumentosController],
    exports: [TiposDocumentosService]
})

export class TiposDocumentosModule { }