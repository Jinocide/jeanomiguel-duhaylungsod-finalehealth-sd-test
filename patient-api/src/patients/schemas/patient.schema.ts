import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Patient {
    @Prop({required: true}) firstName: string;
    @Prop({required: true}) lastName: string;
    @Prop({required: true}) dob: Date;
    @Prop({required: true}) email: string;
    @Prop({required: true}) phoneNumber: string;
    @Prop({required: true}) address: string;
}

export type PatientDocument = Patient & Document;
export const PatientSchema = SchemaFactory.createForClass(Patient);