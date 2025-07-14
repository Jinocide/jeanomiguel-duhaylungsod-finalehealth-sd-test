import { IsString, IsNotEmpty, IsDateString, IsEnum } from "class-validator";

export enum VisitType {
    Home = 'Home',
    Telehealth = 'Telehealth',
    Clinic = 'Clinic'
}

export class VisitDTO {
    @IsDateString()
    visitDate: string;

    @IsString()
    notes?: string;

    @IsEnum(VisitType)
    visitType: VisitType;
}