import { 
    Controller,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException, 
} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitDTO } from './dto/visit.dto';

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitService: VisitsService) {}

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: VisitDTO) {
        const result = await this.visitService.update(id, dto);
        if (!result) throw new NotFoundException('Visit not found');
        return result;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const result = await this.visitService.remove(id);
        if (!result) throw new NotFoundException('Visit not found');
        return result;
    }
}
