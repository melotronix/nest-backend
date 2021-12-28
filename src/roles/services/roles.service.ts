import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private userRolesRepository: typeof Role) {
  }

  async createRole(dto: CreateRoleDto) {
    return await this.userRolesRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    return await this.userRolesRepository.findOne({where: {value}});
  }

}
