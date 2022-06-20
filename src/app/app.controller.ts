import { BadRequestException, Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards';
import { bcrypt } from 'src/helpers';
import { validateConfirmations } from 'src/helpers';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('/api')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ){}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginDto: LoginDto){
    return await this.authService.login(loginDto);
  }

  @Post('/register')
  @UseInterceptors(
    FileInterceptor(
      'photo',
      {
        storage: diskStorage({
          destination: `images/users`,
          filename: ({ body }, file, cb) => {
            cb(null, `${Date.now()}_${body.email}.png`);
          }
        })
      }
    )
  )
  async register(@UploadedFile() photo: Express.Multer.File, @Body() createUserDto: CreateUserDto){
    validateConfirmations(createUserDto);
    if (createUserDto.password != createUserDto.password_confirmation) throw new BadRequestException({ message: 'la contraseña no coincide con la confirmación' });
    delete createUserDto.password_confirmation;
    if (photo) {
      createUserDto.photo = `${photo.destination}/${photo.filename}`;
    }
    const existUser = await this.userService.findEmail(createUserDto.email);
    if (existUser) throw new BadRequestException({ response: 'This email already exist.' });
    createUserDto.password = await bcrypt.encryptPassword(createUserDto.password);
    if (!(await this.userService.create(createUserDto))) throw new BadRequestException({ message: 'Error to create the user.' });
    return await this.login({ email: createUserDto.email, password: createUserDto.password });
  }
}
