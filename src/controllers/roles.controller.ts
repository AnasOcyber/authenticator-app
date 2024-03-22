import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from 'src/services/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Get()
  getAllRoles() {
    return this.rolesService.findAllRoles();
  }

  @Get(':roleId')
  getRoleById(@Param('roleId') id: string) {
    return this.rolesService.findRoleById(id);
  }

  @Post()
  createRole(@Body() roleDto: any) {
    return this.rolesService.createRole(roleDto);
  }

  @Patch(':roleId')
  updateRole(@Param('roleId') id: string, @Body() roleDto: any) {
    return this.rolesService.updateRole(id, roleDto);
  }

  @Delete(':roleId')
  deleteRole(@Param('roleId') id: string) {
    return this.rolesService.deleteRole(id);
  }
}