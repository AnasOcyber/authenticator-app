import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { RolesDto } from 'src/dtos/role/role.dto';
import { Role, RoleDocument } from 'src/schemas/roles/role.schema.';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectModel(Role.name) private rolesModel: Model<RoleDocument>,
  ) {}
  async create(roleDto: RolesDto): Promise<RoleDocument> {
    return await this.rolesModel.create(roleDto);
  }

  async findAll(
    filterQuery: FilterQuery<RoleDocument>,
  ): Promise<RoleDocument[]> {
    return await this.rolesModel.find(filterQuery);
  }

  async find(filterQuery: FilterQuery<RoleDocument>): Promise<RoleDocument> {
    return await this.rolesModel.findById(filterQuery);
  }

  async update(
    filterQuery: FilterQuery<RoleDocument>,
    roleDto: RolesDto,
  ): Promise<RoleDocument> {
    const role = await this.rolesModel.findById(filterQuery);
    if (role) {
      return await role.updateOne(roleDto);
    }
    throw new NotFoundException();
  }

  async delete(
    filterQuery: FilterQuery<RoleDocument>,
  ): Promise<{ message: string }> {
    await this.rolesModel.findByIdAndDelete(filterQuery);
    throw new NotFoundException();
  }
}
