import { Controller, Get, Post, Put, Body, Patch, Param, Delete, BadRequestException, UploadedFile, Query, Req, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, unlinkSync } from 'fs';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { bcrypt, validateConfirmations } from 'src/helpers';
import { JwtAuthGuard } from 'src/auth/guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existUser = await this.usersService.findEmail(createUserDto.email);
    if (existUser) throw new BadRequestException({ response: 'This email already exist.' });
    validateConfirmations(createUserDto);
    delete createUserDto.password_confirmation;

    createUserDto.password = await bcrypt.encryptPassword(createUserDto.password);
    if (!this.usersService.create(createUserDto)) throw new BadRequestException({ message: 'Error to create the user.' });
    console.log({createUserDto});
    
    return {
      message: 'User created successfully.'
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    users.forEach(user => delete (user.password));
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { password, ...user } = await this.usersService.findOne(id);
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<object> {
    validateConfirmations(updateUserDto);
    
    const user = await this.usersService.findOne(id);
    if (updateUserDto.password) {
      if (!updateUserDto.old_password) throw new BadRequestException({ message: `Field 'old_password' required` });
      if (!(await bcrypt.comparePassword(updateUserDto.old_password, user.password))) throw new BadRequestException({ message: 'Password not math.' });
      updateUserDto.password = await bcrypt.encryptPassword(updateUserDto.password);
      delete (updateUserDto.old_password);
    }
    const res = this.usersService.update(user.id, updateUserDto);
    if (!res) throw new BadRequestException({ message: 'Ups, was an error in the proccess.' });
    console.log({ message: `User ${user.email} updated.` });
    
    return { message: `User ${user.email} updated.` }
  }

  @Put(':id')
  async updatePut(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<object> {
    validateConfirmations(updateUserDto);
    const user = await this.usersService.findOne(id);
    if (updateUserDto.password) {
      if (!updateUserDto.old_password) throw new BadRequestException({ message: `Field 'old_password' required` });
      if (!(await bcrypt.comparePassword(updateUserDto.old_password, user.password))) throw new BadRequestException({ message: 'Password not math.' });
      updateUserDto.password = await bcrypt.encryptPassword(updateUserDto.password);
      delete (updateUserDto.old_password);
    }
    const res = this.usersService.update(user.id, updateUserDto);
    if (!res) throw new BadRequestException({ message: 'Ups, was an error in the proccess.' });
    console.log({ message: `User ${user.email} updated.` });
    
    return { message: `User ${user.email} updated.` }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
