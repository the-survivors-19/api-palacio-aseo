import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, HttpStatus, Put } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('providers')
@UseGuards(JwtAuthGuard)
@Controller('api/providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  async create(@Body() createProviderDto: CreateProviderDto) {
    const res = await this.providersService.create(createProviderDto);
    if(!res) throw new BadRequestException();
    return { status: 201, message: 'provider registered successful.'};
  }

  @Get()
  async findAll() {
    return await this.providersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.providersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateProviderDto: UpdateProviderDto) {
    return await this.providersService.update(id, updateProviderDto) 
      ? { message: 'Se actualizo el proveedor correctamente.' } 
      : { message: 'Se presento un fallo al actualizar el proveedor.' }
  }

  @Put(':id')
  async updateJava(@Param('id') id: number, @Body() updateProviderDto: UpdateProviderDto) {
    return await this.providersService.update(id, updateProviderDto) 
      ? { message: 'Se actualizo el proveedor correctamente.' } 
      : { message: 'Se presento un fallo al actualizar el proveedor.' }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.providersService.remove(id)
      ? { message: 'Se elimino el proveedor' }
      : { message: 'Hubo un fallo al eliminar el proveedor' }
  }
}
