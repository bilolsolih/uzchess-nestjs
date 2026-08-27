import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignInDto } from '../../dtos/user/public/sign-in.dto';
import { AuthenticationPublicService } from '../../services/user/authentication.public.service';
import { SignUpDto } from '../../dtos/user/public/sign-up.dto';
import { ResendOtpDto, SetPasswordDto, VerifyOtpDto } from '@/features/authentication/dtos/user';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('Auth - Public')
@Controller('auth')
export class AuthenticationPublicController {
  constructor(private readonly authService: AuthenticationPublicService) {
  }

  @Post('sign-up')
  async signUp(@Body() payload: SignUpDto) {
    return await this.authService.signUp(payload);
  }

  @Post('sign-in')
  async signIn(@Res({ passthrough: true }) res: Response, @Body() payload: SignInDto) {
    const result = await this.authService.signIn(payload);
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 6,
    });


    return result;
  }

  @Post('verify-otp')
  async verifyOtp(@Body() payload: VerifyOtpDto) {
    return await this.authService.verifyOtp(payload);
  }

  @Post('resend-otp')
  async resendOtp(@Body() payload: ResendOtpDto) {
    return await this.authService.resendOtp(payload);
  }

  @Post('set-password')
  async setPassword(@Body() payload: SetPasswordDto) {
    return await this.authService.setPassword(payload);
  }
}
