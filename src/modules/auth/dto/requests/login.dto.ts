import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    Correo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Clave: string;
}