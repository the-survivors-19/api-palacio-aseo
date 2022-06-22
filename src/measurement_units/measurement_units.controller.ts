import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { MeasurementUnitsService } from './measurement_units.service';
import { CreateMeasurementUnitDto } from './dto/create-measurement_unit.dto';
import { UpdateMeasurementUnitDto } from './dto/update-measurement_unit.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('measurement units')
@UseGuards(JwtAuthGuard)
@Controller('measurement-units')
export class MeasurementUnitsController {
  constructor(private readonly measurementUnitsService: MeasurementUnitsService) {}

  @Post()
  async create(@Body() createMeasurementUnitDto: CreateMeasurementUnitDto) {
    return await this.measurementUnitsService.create(createMeasurementUnitDto);
  }

  @Get()
  async findAll() {
    return await this.measurementUnitsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.measurementUnitsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMeasurementUnitDto: UpdateMeasurementUnitDto) {
    return await this.measurementUnitsService.update(+id, updateMeasurementUnitDto);
  }

  @Put(':id')
  async updateJava(@Param('id') id: string, @Body() updateMeasurementUnitDto: UpdateMeasurementUnitDto) {
    return await this.measurementUnitsService.update(+id, updateMeasurementUnitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.measurementUnitsService.remove(+id);
  }
}
