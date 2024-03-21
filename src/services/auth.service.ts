import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/auth-secrets/jwt.constants';
import { LoginDto } from 'src/dto/auth/login.dto';
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
          email: user.emails[0].identifier,
          isEmailVerified: user.emails[0].isVerified,
          phone: user.phones[0].identifier,
          isPhoneVerified: user.phones[0].isVerified,
        };
        return {
          access_token: this.jwtService.sign(payload, {
            secret: jwtConstants.secret,
          }),
        };
      }
    }
    return 'Invalid credentials';
  }
}
