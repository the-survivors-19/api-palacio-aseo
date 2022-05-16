import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/app/dto/login.dto';
import { bcrypt } from 'src/helpers';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ){}

  async validateUser(email: string, pass: string){
    const existUser = await this.usersService.findEmail(email);
    if(!existUser) throw new UnauthorizedException();  
    const { password, ...user } = existUser;
    if(!(await bcrypt.comparePassword(pass, password))) throw new UnauthorizedException();
    return user;
  }

  async login({ email }: LoginDto) {
    const payload = {
      email
    }
    return {
      token: this.jwtService.sign(payload),
    }
  }
}
