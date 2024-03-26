import { Injectable } from '@nestjs/common';
import { RolesRepository } from 'src/repositories/roles.respository';
import { RoleDocument } from 'src/schemas/roles/role.schema.';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  createRole(roleDto: any): Promise<RoleDocument> {
    return this.rolesRepository.create(roleDto);
  }

  findAllRoles(): Promise<RoleDocument[]> {
    const filterQuery = {};
    return this.rolesRepository.findAll(filterQuery);
  }

  findRoleById(id: string): Promise<RoleDocument> {
    const filterQuery = { _id: id };
    return this.rolesRepository.find(filterQuery);
  }

  updateRole(id: string, roleDto: any): Promise<RoleDocument> {
    const filterQuery = { _id: id };
    return this.rolesRepository.update(filterQuery, roleDto);
  }

  deleteRole(id: string): Promise<{ message: string }> {
    const filterQuery = { _id: id };
    return this.rolesRepository.delete(filterQuery);
  }
}
