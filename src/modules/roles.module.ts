import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesController } from 'src/controllers/roles.controller';
import { RolesRepository } from 'src/repositories/roles.respository';
import { Auth, AuthSchema } from 'src/schemas/auth/auth.schema';
import { RolesService } from 'src/services/roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
