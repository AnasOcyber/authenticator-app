import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/auth-secrets/jwt.constants';
import { LoginDto } from 'src/dto/auth/login.dto';
import { RegisterDto } from 'src/dto/auth/register.dto';
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
  }: LoginDto): Promise<{ access_token: string } | string> {
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
    throw new UnauthorizedException('Invalid credentials');
  }

  async register(registerDto: RegisterDto) {
    return await this.usersRepository.create(registerDto);
  }
}
