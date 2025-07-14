import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import mongoose from "mongoose";

@Schema({ timestamps:true })
export class Visit {
    @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }) 
    patientID: string;
    @Prop({ required:true }) visitDate: Date;
    @Prop() notes: string;
    @Prop({ required:true, enum: ['Home', 'Telehealth', 'Clinic'] }) visitType: string;
}

export type VisitDocument = Visit & Document;
export const VisitSchema = SchemaFactory.createForClass(Visit);