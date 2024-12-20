import { IsEmail, IsString, MinLength } from "class-validator";

export class RegistrationDto {
    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @MinLength(6)
    password: string;
}
