import { Module } from "@nestjs/common";
import { ProfesionalesService } from "./profesionales.service";
import { ProfesionalesController } from "./profesionales.controller";

@Module({
    imports: [],
    providers: [ProfesionalesService],
    controllers: [ProfesionalesController]
})

export class ProfesionalesModule { }