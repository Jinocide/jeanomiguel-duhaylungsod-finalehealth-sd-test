import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument } from './schemas/visit.schema';
import { VisitDTO } from './dto/visit.dto';

@Injectable()
export class VisitsService {
    constructor(@InjectModel(Visit.name) private visitModel: Model<VisitDocument>) {}

    update(id: string, dto: VisitDTO) {
        return this.visitModel.findByIdAndUpdate(id, dto, {new: true});
    }

    remove(id: string) {
        return this.visitModel.findByIdAndDelete(id);
    }
}
