import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesController } from 'src/controllers/roles.controller';
import { RolesRepository } from 'src/repositories/roles.respository';
import { Role, RoleSchema } from 'src/schemas/roles/roles.schema';
import { RolesService } from 'src/services/roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
