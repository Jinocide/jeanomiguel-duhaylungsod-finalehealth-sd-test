import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';
import { Visit, VisitDocument } from '../visits/schemas/visit.schema'
import { PatientDTO } from './dto/patient.dto';
import { VisitDTO } from 'src/visits/dto/visit.dto';

@Injectable()
export class PatientsService {
    constructor(
        @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
        @InjectModel(Visit.name) private visitModel: Model<VisitDocument>
    ) {}

    //find all patients with visit counts
    findAll() {
        return this.patientModel.aggregate([
            {
                $lookup: {
                    from: 'visits',
                    localField: '_id',
                    foreignField: 'patientID',
                    as: 'visitsJoined'
                },
            },
            {
                $addFields: {
                    visitCount: { $size: { $ifNull: ['$visitsJoined', []] } }
                }
            },
            {
                $project: {
                    visitsJoined: 0
                }
            }
        ]);
        //return this.patientModel.find().exec();
    }

    create(dto: PatientDTO) {
        return new this.patientModel(dto).save();
    }

    update(id: string, dto: PatientDTO) {
        return this.patientModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async remove(id: string) {
        const res1 = await this.visitModel.deleteMany({ patientID: id });
        if (!res1) return res1;
        return await this.patientModel.findByIdAndDelete(id);
    }

    getVisitsByPatient(patientID: string) {
        return this.visitModel.find({ patientID }).sort({ visitDate: -1 });
    }

    addVisit(patientID: string, dto: VisitDTO) {
        return new this.visitModel({ ...dto, patientID }).save();
    }
}
