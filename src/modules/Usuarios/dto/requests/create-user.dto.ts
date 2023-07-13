import { IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    Correo: string;

    @IsString()
    Clave: string;
}