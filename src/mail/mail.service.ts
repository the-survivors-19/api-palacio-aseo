import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

interface DataEmail {
  template: 'forgot_password';
  email: string;
  subject: string;
  context: object;
}

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(data: DataEmail) {
    await this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      template: data.template,
      context: data.context
    })
  }
}
