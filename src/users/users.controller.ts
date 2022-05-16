import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UploadedFile, Query, Req, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, unlinkSync } from 'fs';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { bcrypt } from 'src/helpers';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'photo',
      {
        storage: diskStorage({
          destination: './src/images/users',
          filename: ({body}, file, cb) => {
            cb(null, `${ body.full_name }_${ Date.now() }.png`);
          }
        })
      }
    )
  )
  async create(@UploadedFile() photo: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
    if(photo){
      createUserDto.photo = `${photo.destination}/${photo.filename}`;
    }
    const existUser = await this.usersService.findEmail(createUserDto.email);
    if (existUser) throw new BadRequestException({ response: 'This email already exist.' });
    createUserDto.password = await bcrypt.encryptPassword(createUserDto.password);
    if(!this.usersService.create(createUserDto)) throw new BadRequestException({ message: 'Error to create the user.' });
    return {
      message: 'User created successfully.'
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    users.forEach(user => delete(user.password));
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const { password, ...user } = await this.usersService.findOne(id);
    return user;
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor(
      'photo',
      {
        storage: diskStorage({
          destination: './src/images/users',
          filename: ({body}, file, cb) => {
            cb(null, `${ body.full_name }_${ Date.now() }.png`);
          }
        })
      }
    )
  )
  async update(@Param('id') id: number, @UploadedFile() photo: Express.Multer.File, @Body() updateUserDto: UpdateUserDto): Promise<object> {
    const user = await this.usersService.findOne(id);
    if(updateUserDto.password){
      if(!updateUserDto.old_password) throw new BadRequestException({ message: `Field 'old_password' required` });
      if(!(await bcrypt.comparePassword(updateUserDto.old_password, user.password))) throw new BadRequestException({ message: 'Password not math.' });
      updateUserDto.password = await bcrypt.encryptPassword(updateUserDto.password);
      delete(updateUserDto.old_password);
    }
    if(photo){
      if(user.photo && existsSync(user.photo)){
        await unlinkSync(user.photo);
      }
      updateUserDto.photo = `${photo.destination}/${photo.filename}`;
    }
    const res = this.usersService.update(id, updateUserDto);
    if(!res) throw new BadRequestException({message: 'Ups, was an error in the proccess.'});
    return { message: `User ${id} updated.` }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
