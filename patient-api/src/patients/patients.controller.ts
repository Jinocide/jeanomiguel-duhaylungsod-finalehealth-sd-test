import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param, 
    HttpException, 
    HttpStatus, 
    NotFoundException
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientDTO } from './dto/patient.dto';
import { VisitDTO } from 'src/visits/dto/visit.dto';

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientService: PatientsService) {}

    @Get()
    async findAll() {
        try {
            return await this.patientService.findAll();
        }
        catch(err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async create(@Body() dto: PatientDTO) {
        try {
            return await this.patientService.create(dto);
        }
        catch(err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')  
    async update(@Param('id') id: string, @Body() dto: PatientDTO) {
        const result = await this.patientService.update(id, dto);
        if (!result) throw new NotFoundException('Patient not found');
        return result;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const result = await this.patientService.remove(id);
        if (!result) throw new NotFoundException('Patient not found');
        return result;
    }

    @Get(':id/visits')
    async getVisits(@Param('id') id: string) {
        try {
            return await this.patientService.getVisitsByPatient(id);
        }
        catch(err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post(':id/visits')
    async addVisit(@Param('id') id: string, @Body() dto: VisitDTO) {
        try {
            return await this.patientService.addVisit(id, dto);
        }
        catch(err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
