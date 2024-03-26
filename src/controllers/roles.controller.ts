import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesDto } from 'src/dtos/role/role.dto';
import { RoleDocument } from 'src/schemas/roles/role.schema.';
import { RolesService } from 'src/services/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  createRole(@Body() roleDto: RolesDto): Promise<RoleDocument> {
    return this.rolesService.createRole(roleDto);
  }

  @Get()
  getAllRoles(): Promise<RoleDocument[]> {
    return this.rolesService.findAllRoles();
  }

  @Get(':roleId')
  getRoleById(@Param('roleId') id: string): Promise<RoleDocument> {
    return this.rolesService.findRoleById(id);
  }

  @Patch(':roleId')
  updateRole(
    @Param('roleId') id: string,
    @Body() roleDto: RolesDto,
  ): Promise<RoleDocument> {
    return this.rolesService.updateRole(id, roleDto);
  }

  @Delete(':roleId')
  deleteRole(@Param('roleId') id: string): Promise<{ message: string }> {
    return this.rolesService.deleteRole(id);
  }
}
