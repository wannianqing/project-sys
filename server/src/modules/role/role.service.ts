import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CreateRoleDto } from './dto/createRole.dto';
import {
  ROLE_EXIST,
  ROLE_DELETE_ERR,
  ROLE_NOT_EXIST,
  NOT_ALLOW_DELETE,
} from 'src/common/message';
import { customMsg } from 'src/common/utils';
import { UserEntity } from '../user/user.entity';
import { RoleMenuEntity } from '../roleMenu/roleMenu.entity';
import { UpdateRoleDto } from './dto/updateRole.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>,
  ) {}

  async handleCreateRole(createRole: CreateRoleDto) {
    const role = this.roleRepository.create(createRole);
    const { rolename } = role;
    const queryBuilder = this.roleRepository.createQueryBuilder('roles');
    const isExist = await queryBuilder
      .where('roles.rolename = :rolename', { rolename })
      .getOne();
    if (isExist) {
      return customMsg(ROLE_EXIST.MSG, ROLE_EXIST.CODE);
    }
    const result = await this.roleRepository.save(role);
    return result;
  }

  async handleListByPage(pageNum, pageSize) {
    const queryBuilder = this.roleRepository.createQueryBuilder('roles');
    const [role, total] = await queryBuilder
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return {
      data: {
        list: role,
        total,
      },
    };
  }

  async handleRoleListAll() {
    const listEntity = await this.roleRepository.find();
    return {
      data: listEntity,
    };
  }

  async handleRoleDelete(id: string) {
    if (id == '1' || id == '2') {
      return customMsg(NOT_ALLOW_DELETE.MSG, NOT_ALLOW_DELETE.CODE);
    }
    // 查找该角色是否分配给了用户;
    const user = await this.userRepository.findOne({
      where: { role: { id: id } },
      relations: ['role'],
    });
    if (user) {
      return customMsg(ROLE_DELETE_ERR.MSG, ROLE_DELETE_ERR.CODE);
    }

    // 查找该角色下是否授权了菜单
    const menuQueryBuilder =
      this.roleMenuRepository.createQueryBuilder('role_menu');
    const roleMenus = await menuQueryBuilder
      .innerJoinAndSelect('role_menu.role', 'roles')
      .where('roles.id = :id', { id })
      .getMany();

    if (roleMenus.length) {
      const ids = roleMenus.map((item) => item.id);
      // 批量删除授权给这个角色的菜单
      await menuQueryBuilder
        .delete()
        .from(RoleMenuEntity)
        .where('id IN (:...ids)', { ids })
        .execute();
    }
    const queryBuilder = this.roleRepository.createQueryBuilder('roles');
    const result = await queryBuilder
      .delete()
      .from(RoleEntity)
      .where('id =:id', { id })
      .execute();
    return { data: null };
  }

  async handleRoleUpdate(body: UpdateRoleDto) {
    const { id, remark } = body;
    const queryBuilder = this.roleRepository.createQueryBuilder('roles');
    const role = await queryBuilder.where('id =:id', { id }).getOne();

    if (!role) {
      return customMsg(ROLE_NOT_EXIST.MSG, ROLE_NOT_EXIST.CODE);
    }
    const result = await queryBuilder
      .update(RoleEntity)
      .set({ remark: remark })
      .where('id = :id', { id })
      .execute();

    return { data: result };
  }
}
