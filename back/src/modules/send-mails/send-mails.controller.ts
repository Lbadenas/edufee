import { Controller, Post, Body } from '@nestjs/common';
import { SendMailsService } from './send-mails.service';
import { SendEmailDto } from './dto/welcome-mails.dto';
import { ContactEmailDto } from './dto/contact-mails';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Send-email')
@Controller('send-mails')
export class SendMailsController {
  constructor(private readonly sendMailsService: SendMailsService) {}

  @Post('welcome')
  async sendWelcomeEmail(@Body() body: SendEmailDto) {
    const user = {
      email: body.email,
      name: body.name,
    };
    // const jwt = body.jwt;

    await this.sendMailsService.sendEmail(user);
    return { message: 'Correo de bienvenida enviado correctamente' };
  }
  @Post('contact')
  async sendContactEmail(@Body() body: ContactEmailDto) {
    const user = {
      email: body.email,
      name: body.name,
      message: body.message,
    };
    // const jwt = body.jwt;
    await this.sendMailsService.sendContactEmail(user);
    return { message: 'Correo de contacto enviado correctamente' };
  }

  @Post('review')
  async sendReviewEmail(@Body() body: any) {
    const user = {
      email: body.email,
      name: body.name,
    };
    // const jwt = body.jwt;
    await this.sendMailsService.sendReviewEmail(user);
    return { message: 'Correo de review enviado correctamente' };
  }

  @Post('approval')
  async sendApprovalEmail(@Body() body: any) {
    const user = {
      email: body.email,
      name: body.name,
    };
    // const jwt = body.jwt;
    await this.sendMailsService.sendApprovalEmail(user);
    return { message: 'Correo de aprobacion enviado correctamente' };
  }

  @Post('rejection')
  async sendRejectionEmail(@Body() body: any) {
    const user = {
      email: body.email,
      name: body.name,
    };
    // const jwt = body.jwt;
    await this.sendMailsService.sendRejectionEmail(user);
    return { message: 'Correo de rechazo enviado correctamente' };
  }

  @Post('payment-confirmation')
  async sendPaymentConfirmationEmail(@Body() body: any) {
    const user = {
      email: body.email,
      name: body.name,
    };
    // const jwt = body.jwt;
    await this.sendMailsService.sendPaymentConfirmationEmail(user);
    return { message: 'Correo enviado correctamente' };
  }
}
