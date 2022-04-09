import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards,} from '@nestjs/common';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiTags,} from '@nestjs/swagger';
import {SpecialistService} from './specialist.service';
import {CreateSpecialistDto, SimpleSpecialistDto, UpdateSpecialistDto,} from './specialist.dto';
import {Specialist} from './specialist.entity';
import {UpdateDto} from "../dto/result.dto";
import {JwtAuthGuard} from "../auth/guard/jwt.guard";

@Controller('api/v1/specialists')
@ApiTags('specialists')
export class SpecialistController {
    constructor(private readonly specialistService: SpecialistService) {
    }

    @ApiCreatedResponse({
        type: SimpleSpecialistDto,
        isArray: true,
        description: 'Специалист',
    })
    @Get()
    getSimpleVersionSpecialists() {
        return this.specialistService.getSimpleVersionSpecialists();
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({name: 'id', description: 'id специалиста'})
    @ApiCreatedResponse({type: Specialist, description: 'Специалист'})
    @Get(':id')
    getSpecialistById(@Param('id', ParseIntPipe) id: number) {
        return this.specialistService.getSpecialistById(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBody({type: CreateSpecialistDto, description: 'Специалист'})
    @ApiCreatedResponse({type: Specialist, description: 'Специалист'})
    @Post()
    createSpecialist(@Body() createDto: CreateSpecialistDto) {
        return this.specialistService.createSpecialist(createDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({name: 'id', description: 'id специалиста'})
    @ApiBody({type: CreateSpecialistDto, description: 'Специалист'})
    @ApiCreatedResponse({type: UpdateDto, description: 'Результат обновления'})
    @Patch(':id')
    updateSpecialistById(
        @Param('id', ParseIntPipe) id,
        @Body() updateDto: UpdateSpecialistDto,
    ) {
        return this.specialistService.updateSpecialistById(id, updateDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({name: 'id', description: 'id специалиста'})
    @ApiCreatedResponse({type: Specialist, description: 'Специалист'})
    @ApiCreatedResponse({type: UpdateDto, description: 'Результат удаления'})
    @Delete(':id')
    deleteSpecialistById(@Param('id', ParseIntPipe) id: number) {
        return this.specialistService.deleteSpecialistById(id);
    }
}
