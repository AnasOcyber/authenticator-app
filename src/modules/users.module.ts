import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UsersRepository } from '../repositories/users.repository';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth-secrets/jwt.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, UsersRepository, AuthService, JwtService],
})
export class UsersModule {}
