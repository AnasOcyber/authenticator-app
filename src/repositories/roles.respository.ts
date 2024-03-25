import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolesDto } from 'src/dto/role/role.dto';
import { Role } from 'src/schemas/roles/roles.schema';

@Injectable()
export class RolesRepository {
  constructor(@InjectModel(Role.name) private rolesModel: Model<Role>) {}

  async find(id: string): Promise<Role> {
    return await this.rolesModel.findById(id);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesModel.find();
  }

  async create(roleDto: RolesDto): Promise<Role> {
    return await this.rolesModel.create(roleDto);
  }

  async update(id: string, roleDto: RolesDto): Promise<Role> {
    const role = await this.rolesModel.findById(id);
    if (role) {
      return await role.updateOne(roleDto);
    }
    throw new NotFoundException();
  }

  async delete(id: string): Promise<boolean> {
    const role = await this.rolesModel.findById(id);
    if (role) {
      const { acknowledged } = await role.deleteOne();
      return acknowledged;
    }
    throw new NotFoundException();
  }
}
