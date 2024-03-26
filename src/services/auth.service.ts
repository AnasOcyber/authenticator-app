import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dtos/auth/auth.dto';
import { AuthRepository } from 'src/repositories/auth.repository';
import { Auth, AuthDocument } from 'src/schemas/auth/auth.schema';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async createAuth(authDto: AuthDto): Promise<Auth> {
    return await this.authRepository.create(authDto);
  }

  async findAllAuths(): Promise<AuthDocument[]> {
    const filterQuery = {};
    return await this.authRepository.find(filterQuery);
  }

  async findOneAuth(authId: string): Promise<AuthDocument> {
    const filterQuery = { _id: authId };
    return await this.authRepository.findOne(filterQuery);
  }

  async updateAuth(
    authId: string,
    authUpdates: AuthDto,
  ): Promise<AuthDocument> {
    const filterQuery = { _id: authId };
    return await this.authRepository.update(filterQuery, authUpdates);
  }

  async deleteAuth(userId: string): Promise<{ message: string }> {
    const filterQuery = { userId: userId };
    return await this.authRepository.delete(filterQuery);
  }

  // async login({
  //   email,
  //   password,
  // }: LoginDto): Promise<{ access_token: string }> {
  //   const user = await this.usersRepository.findByEmail({
  //     'emails.identifier': email,
  //   });
  //   if (user) {
  //     const isValid = await bcrypt.compare(password, user.password);
  //     if (isValid) {
  //       const payload = {
  //         userId: user._id,
  //         isEmailVerified: user.emails[0].isVerified,
  //         isPhoneVerified: user.phones[0].isVerified,
  //       };
  //       return {
  //         access_token: this.jwtService.sign(payload, {
  //           secret: jwtConstants.secret,
  //         }),
  //       };
  //     }
  //   }
  //   throw new UnauthorizedException();
  // }
  // async register(userDto: UserDto) {
  //   return await this.usersService.createUser(userDto);
  // }
}
