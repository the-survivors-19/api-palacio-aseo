import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as os from 'os';
import { ForgotPasswordDto } from 'src/app/dto/forgot_password';
import { LoginDto } from 'src/app/dto/login.dto';
import { bcrypt } from 'src/helpers';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string) {
    const existUser = await this.usersService.findEmail(email);
    if (!existUser) throw new UnauthorizedException();
    const { password, ...user } = existUser;
    if (!(await bcrypt.comparePassword(pass, password)))
      throw new UnauthorizedException();
    return user;
  }

  async login({ email }: LoginDto) {
    const { auth_google, created_at, password, updated_at, state, ...user } =
      await this.usersService.findEmail(email);
    const payload = {
      email,
    };
    
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.usersService.findEmail(email);
    if (!user)
      throw new BadRequestException({
        message: 'El correo no se encuentra registrado.',
      });
    const payload = {
      email
    };
    
    const token = this.jwtService.sign(payload);
    await this.mailService.sendEmail({
      email,
      template: 'forgot_password',
      subject: 'Recuperar cuenta',
      context: {
        user: user.full_name,
        url: `https://palaciodelaseo.com/recuperar-contrasenia?token=${token}`

      }
    });
    return {
      message: 'Se envio un correo de recuperación, si no te llega revisa en SPAM'
    }
  }
}
