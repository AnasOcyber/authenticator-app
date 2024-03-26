import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/users/user.schema';
import { UsersRepository } from '../repositories/users.repository';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constants';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
    }),
    AuthModule,
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, UsersRepository, JwtService],
})
export class UsersModule {}
