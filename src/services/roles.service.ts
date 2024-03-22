import { Injectable } from '@nestjs/common';
import { RolesRepository } from 'src/repositories/roles.respository';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  findAllRoles() {
    return this.rolesRepository.findAll();
  }

  findRoleById(id: string) {
    return this.rolesRepository.find(id);
  }

  createRole(roleDto: any) {
    return this.rolesRepository.create(roleDto);
  }

  updateRole(id: string, roleDto: any) {
    return this.rolesRepository.update(id, roleDto);
  }

  deleteRole(id: string) {
    return this.rolesRepository.delete(id);
  }
}
