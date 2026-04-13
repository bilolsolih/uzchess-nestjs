import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import argon2 from 'argon2';
import { OtpCodePublicService } from '@/features/authentication/services/otp-code/otp-code.public.service';
import { ResendOtpDto, SetPasswordDto, SignInDto, SignUpDto, VerifyOtpDto } from '@/features/authentication/dtos/user';
import { OtpType } from '@/core/enums/otp-type.enum';
import { OtpCode } from '@/features/authentication/entities/otp-code.entity';
import { ILike } from 'typeorm';

@Injectable()
export class AuthenticationPublicService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly otpService: OtpCodePublicService,
  ) {
  }

  async signUp(payload: SignUpDto) {
    let user = await User.findOneBy({ login: ILike(payload.login) });

    if (user && user.isActive && user.isVerified) {
      throw new BadRequestException('User with given login already exists');
    }

    if (user) {
      user.fullName = payload.fullName;
    } else {
      user = User.create(payload as User);
    }
    await User.save(user);
    await this.otpService.sendOtp(user, OtpType.Register);

    return user;
  }

  async signIn({ login, password }: SignInDto) {
    let user = await User.findOneBy({ login: ILike(login) });
    if (!user || !user.password) {
      throw new UnauthorizedException();
    }

    if (!user.isActive || !user.isVerified) {
      throw new UnauthorizedException();
    }

    let passwordsMatch = await argon2.verify(user.password, password);
    if (!passwordsMatch) {
      throw new UnauthorizedException();
    }

    let userPayload = {
      id: user.id,
      login: user.login,
      role: user.role,
    };

    let accessToken = this.jwtService.sign(userPayload);

    return { accessToken: accessToken };
  }

  async verifyOtp({ login, code }: VerifyOtpDto) {
    let user = await User.findOneBy({ login: ILike(login) });
    if (!user) {
      throw new BadRequestException('User with given login does not exist');
    }

    let otpValid = await this.otpService.verifyOtp(user.id, code);
    if (!otpValid) {
      throw new BadRequestException('Code invalid');
    }

    user.isVerified = true;
    await User.save(user);
    return user;
  }

  async setPassword(payload: SetPasswordDto) {
    let user = await User.findOneBy({ login: ILike(payload.login) });
    if (!user) {
      throw new NotFoundException('Does not exist');
    }

    let otpCode = await OtpCode.findOneBy({ userId: user.id, code: payload.code, type: OtpType.Register });
    if (!otpCode) {
      throw new BadRequestException('Code is wrong');
    }

    user.password = await argon2.hash(payload.password);
    user.isActive = true;

    await User.save(user);
    return { message: 'Ok' };
  }

  async resendOtp({ login, loginType }: ResendOtpDto) {
    let user = await User.findOneBy({ login: ILike(login), loginType });
    if (!user) {
      throw new NotFoundException('User with given login and loginType does not exist');
    }

    let otpExpire = Number(process.env.OTP_EXPIRE) * 1000;

    let lastOtp = await OtpCode.findOne({
      where: { userId: user.id },
      order: { created: 'desc' },
    });

    if (lastOtp) {
      let difference = Date.now() - Date.parse(lastOtp.created);
      if (difference < otpExpire) {
        throw new BadRequestException('Code not expired yet');
      }
    }

    await this.otpService.sendOtp(user, OtpType.Register);
    return { message: 'Ok' };
  }
}
