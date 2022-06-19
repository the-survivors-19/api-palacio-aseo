import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { PqrsService } from './pqrs.service';
import { CreatePqrDto } from './dto/create-pqr.dto';
import { UpdatePqrDto } from './dto/update-pqr.dto';
import { JwtStrategy } from 'src/auth/strategies';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@ApiTags('pqrs')
@Controller('api/pqrs')
@UseGuards(JwtStrategy)
export class PqrsController {
  constructor(
    private readonly pqrsService: PqrsService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async create(@Body() createPqrDto: CreatePqrDto, @Headers('authorization') token) {
    const tokenJwt = token.split(' ')[1];
    const dataToken = this.jwtService.decode(tokenJwt);
    const { id: user_id } = await this.userService.findEmail(dataToken["email"]);
    const createPqrs = {
      description: createPqrDto.description,
      type_pqrs: createPqrDto.type_pqrs,
      user_id,
    }
    return this.pqrsService.create(createPqrs);
  }

  @Get()
  findAll() {
    return this.pqrsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pqrsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePqrDto: UpdatePqrDto) {
    return this.pqrsService.update(+id, updatePqrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pqrsService.remove(+id);
  }
}
