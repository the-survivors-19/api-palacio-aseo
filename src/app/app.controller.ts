import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard, JwtAuthGuard } from 'src/auth/guards';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Controller('/api')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ){}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() login: LoginDto){
    return this.authService.login(login);
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto){
    const existUser = await this.userService.findEmail(createUserDto.email);
    if (existUser) throw new BadRequestException({ response: 'This email already exist, if you forgot the password please contact with the admin.' });
    await this.userService.create(createUserDto);
    return this.login({ email: createUserDto.email, password: createUserDto.password });
  }
}
