import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/authenticator'),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
