import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    Correo: string;

    @IsString()
    @IsNotEmpty()
    Clave: string;
}