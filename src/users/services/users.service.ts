import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { RolesService } from '../../roles/services/roles.service';
import { AssignRoleDto } from '../dto/assign-role.dto';
import { BanUserDto } from '../dto/ban-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {}

  /**
   * Создать пользователя
   *
   * @param dto
   */
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  /**
   * Получить список всех пользователей
   */
  async getAllUsers() {
    return await this.userRepository.findAll({include: {all: true}});
  }

  /**
   * Получить пользователя по E-mail (проверка существования пользователя в системе)
   *
   * @param email
   */
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({where: {email}, include: {all: true}})
  }

  /**
   * Назначить роль пользователю
   *
   * @param dto
   */
  async assignRole(dto: AssignRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if(user && role) {
      await user.$add('role', role.id);
    } else {
      throw new HttpException('Пользователь или роль не найдены!', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Заблокировать пользователя
   *
   * @param dto
   */
  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if(!user) {
      throw new HttpException('Пользователь с таким ID не найден!', HttpStatus.NOT_FOUND);
    } else {
      user.banned = true;
      user.banReason = dto.reason;
      await user.save();
    }
    return user;
  }
}
