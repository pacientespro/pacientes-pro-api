import { IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    Usuario: string;

    @IsString()
    Clave: string;
}