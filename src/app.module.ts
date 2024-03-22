import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users.module';
import { RolesModule } from './modules/roles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/authenticator'),
    UsersModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
