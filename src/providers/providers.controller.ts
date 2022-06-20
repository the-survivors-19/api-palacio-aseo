import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Response, HttpStatus } from '@nestjs/common';
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
  async update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto, @Response() res) {
    const response = {
      message: 'provider update'
    }
    if(!Object.keys(updateProviderDto).length) return res.status(HttpStatus.ACCEPTED).json(response); 
    const con = await this.providersService.update(+id, updateProviderDto);
    if(!con) throw new BadRequestException();
    return res.status(HttpStatus.OK).json(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Response() response) {
    const res = await this.providersService.remove(+id);
    if(!res) throw new BadRequestException();
    return response.status(HttpStatus.OK).json({message: 'provider delete successful.'});
  }
}
