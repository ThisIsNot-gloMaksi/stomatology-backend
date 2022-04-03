import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SpecialistService } from './specialist.service';
import {
  CreateSpecialistDto,
  SimpleSpecialistDto,
  UpdateSpecialistDto,
} from './specialist.dto';
import { Specialist } from './specialist.entity';

@Controller('api/v1/specialists')
@ApiTags('specialists')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @ApiCreatedResponse({
    type: SimpleSpecialistDto,
    isArray: true,
    description: 'Специалист',
  })
  @Get()
  getSimpleVersionSpecialists() {
    return this.specialistService.getSimpleVersionSpecialists();
  }

  @ApiParam({ name: 'id', description: 'id специалиста' })
  @ApiCreatedResponse({ type: Specialist, description: 'Специалист' })
  @Get(':id')
  getSpecialistById(@Param('id') id: number) {
    return this.specialistService.getSpecialistById(id);
  }

  @ApiBody({ type: CreateSpecialistDto, description: 'Специалист' })
  @ApiCreatedResponse({ type: Specialist, description: 'Специалист' })
  @Post()
  createSpecialist(@Body() createDto: CreateSpecialistDto) {
    return this.specialistService.createSpecialist(createDto);
  }

  @ApiParam({ name: 'id', description: 'id специалиста' })
  @ApiBody({ type: CreateSpecialistDto, description: 'Специалист' })
  @ApiCreatedResponse({ type: Specialist, description: 'Специалист' })
  @Put(':id')
  updateSpecialistById(
    @Param('id') id,
    @Body() updateDto: UpdateSpecialistDto,
  ) {
    return this.specialistService.updateSpecialistById(id, updateDto);
  }

  @ApiParam({ name: 'id', description: 'id специалиста' })
  @ApiCreatedResponse({ type: Specialist, description: 'Специалист' })
  @Delete(':id')
  deleteSpecialistById(@Param(':id') id: number) {
    return this.specialistService.deleteSpecialistById(id);
  }
}
