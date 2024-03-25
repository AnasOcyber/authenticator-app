import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { jwtConstants } from 'src/constants/jwt.constants';
import { LoginDto } from 'src/dto/auth/login.dto';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UsersRepository } from 'src/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async login({
    email,
    password,
  }: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findByEmail({
      'emails.identifier': email,
    });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const payload = {
          userId: user._id,
          isEmailVerified: user.emails[0].isVerified,
          isPhoneVerified: user.phones[0].isVerified,
        };
        return {
          access_token: this.jwtService.sign(payload, {
            secret: jwtConstants.secret,
          }),
        };
      }
    }
    throw new UnauthorizedException();
  }

  async register(userDto: CreateUserDto) {
    const { personalInfo, password, phones, emails, tags } = userDto;

    const errors = await validate(userDto);
    if (errors.length > 0) {
      throw new BadRequestException();
    }

    return await this.usersRepository.create({
      personalInfo,
      password,
      phones,
      emails,
      tags,
    });
  }
}
