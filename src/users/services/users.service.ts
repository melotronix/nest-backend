import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { RolesService } from '../../roles/services/roles.service';

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
    const role = await this.roleService.getRoleByValue('USER');
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
}
