import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';

@Controller('roles')
export class RolesController {
   constructor(private rolesSetvice: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesSetvice.createRole(dto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return  this.rolesSetvice.getRoleByValue(value);
  }
}
