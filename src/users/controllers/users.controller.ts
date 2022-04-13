import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../models/users.model';
import { RolesAuth } from '../../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AssignRoleDto } from '../dto/assign-role.dto';
import { BanUserDto } from '../dto/ban-user.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  /**
   * Создать пользователя в системе
   *
   * @param userDto
   */
  @ApiOperation({summary: 'Создать пользователя'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  /**
   * Получить список всех пользователей
   *
   */
  @ApiOperation({summary: 'Получить всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  /**
   * Назначить пользователю роль (только для админа)
   *
   * @param assignRoleDto
   */
  @ApiOperation({summary: 'Назначить роль пользователю'})
  @ApiResponse({status: 200})
  @UseGuards(RolesGuard)
  @Post('/role')
  assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return this.usersService.assignRole(assignRoleDto);
  }

  /**
   * Заблокировать пользователя
   *
   * @param dto
   */
  @ApiOperation({summary: 'Заблокировать пользователя'})
  @ApiResponse({status: 200})
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
