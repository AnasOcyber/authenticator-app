import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from 'src/constants/jwt.constants';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthRepository } from 'src/repositories/auth.repository';
import { Auth, AuthSchema } from 'src/schemas/auth/auth.schema';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
