import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SignUpProfesionalDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Nombres: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Apellidos: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    IdTipoDocumento: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Documento: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    IdProfesion: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Clave: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    Correo: string;
}