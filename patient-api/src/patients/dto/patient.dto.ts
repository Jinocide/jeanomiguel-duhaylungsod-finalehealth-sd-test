import { IsString, IsNotEmpty, IsEmail, IsDateString } from "class-validator";

export class PatientDTO {
    @IsString() 
    @IsNotEmpty() 
    firstName: string;

    @IsString()
    @IsNotEmpty ()
    lastName: string;

    @IsDateString()
    dob: string;

    @IsEmail()
    email: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    address: string;
}