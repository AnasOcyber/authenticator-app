import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/auth/login.dto';
import { UsersRepository } from 'src/repositories/users.repository';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async login({ email, password }: LoginDto): Promise<User | string> {
    const user = await this.usersRepository.findByEmail({
      'emails.identifier': email,
    });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) return user;
    }
    return 'Invalid credentials';
  }
}
