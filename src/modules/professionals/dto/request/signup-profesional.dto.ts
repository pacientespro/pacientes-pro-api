import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SignUpProfesionalDto{
    @IsString()
    @IsNotEmpty()
    Nombres: string;

    @IsString()
    @IsNotEmpty()
    Apellidos: string;

    @IsNumber()
    @IsNotEmpty()
    IdTipoDocumento: number;

    @IsString()
    @IsNotEmpty()
    Documento: string;

    @IsNumber()
    @IsNotEmpty()
    IdProfesion: number;

    @IsString()
    @IsNotEmpty()
    Clave: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    Correo: string;
}