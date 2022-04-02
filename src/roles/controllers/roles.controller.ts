import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../models/roles.model';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
   constructor(private rolesService: RolesService) {}

  @ApiOperation({summary: 'Создать роль пользователя'})
  @ApiResponse({status: 200, type: [Role]})
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({summary: 'Получить роль по ее значению'})
  @ApiResponse({status: 200, type: [Role]})
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return  this.rolesService.getRoleByValue(value);
  }
}
