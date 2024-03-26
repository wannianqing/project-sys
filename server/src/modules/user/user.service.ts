import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { RoleMenuService } from '../roleMenu/roleMenu.service';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../role/role.entity';
import { CreateUserDto } from './dto/createDto';
import { customMsg, encrypt, transformToArrayToTree } from 'src/common/utils';
import {
  USER_EXIST,
  VERIFY_CODE,
  USER_NOT_EXIST,
  ROLE_NOT_EXIST,
  FIRM_NOT_EXIST,
} from 'src/common/message';
import { ResetPwdDto, UpdateUserDto } from './dto/updateDto';
import { FirmEntity } from '../firm/firm.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(FirmEntity)
    private readonly firmRepository: Repository<FirmEntity>,
    private readonly authService: AuthService,
    private readonly roleMenuService: RoleMenuService,
  ) {}

  async handleLoginUser(parameter, sessionCode) {
    if (!parameter.hasOwnProperty('username') || parameter['username'] === '') {
      throw new HttpException(
        { message: '缺少username参数' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!parameter.hasOwnProperty('password') || parameter['password'] === '') {
      throw new HttpException(
        { message: '缺少password参数' },
        HttpStatus.BAD_REQUEST,
      );
    }
    // if(!parameter.hasOwnProperty('code') || parameter['code']===''){
    //   throw new HttpException({message:'缺少code参数'},HttpStatus.BAD_REQUEST)
    // }
    const { username, password: pwd, code } = parameter;
    // if(code.toLowerCase() !== sessionCode.toLowerCase()){
    //   return customMsg(VERIFY_CODE.MSG,VERIFY_CODE.CODE)
    // }
    const encryptPassword = encrypt(pwd);

    const queryBuilder = this.userRepository.createQueryBuilder('users');
    const user = await queryBuilder
      .where('users.username = :username AND users.password = :password', {
        username,
        password: encryptPassword,
      })
      .getOne();

    if (!user) {
      throw new HttpException(
        { message: '账户、密码错误' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.authService.createToken({
      id: user.id,
      username: user.username,
    });
    return {
      data: token,
    };
  }

  async handleCreateUser(createUser: CreateUserDto) {
    const user = this.userRepository.create(createUser);
    const { username, password } = user;

    const queryBuilder = this.userRepository.createQueryBuilder('users');
    const isExist = await queryBuilder
      .where('users.username = :username', { username })
      .getOne();
    if (isExist) {
      return customMsg(USER_EXIST.MSG, USER_EXIST.CODE);
    }
    const roleQueryBuilder = this.roleRepository.createQueryBuilder('roles');
    const role = await roleQueryBuilder
      .where('roles.id = :id', { id: 2 })
      .getOne();
    if (!role) {
      return customMsg(ROLE_NOT_EXIST.MSG, ROLE_NOT_EXIST.CODE);
    }
    if (user.type === 2) {
      const firmQueryBuilder = this.firmRepository.createQueryBuilder('firm');
      const firm = await firmQueryBuilder
        .where('firm.id = :id', { id: user.firm })
        .getOne();
      if (!firm) {
        return customMsg(FIRM_NOT_EXIST.MSG, FIRM_NOT_EXIST.CODE);
      }
      user.firm = firm;
    }
    const maxValue = await this.userRepository.createQueryBuilder('users')
      .select('MAX(users.num)','maxNum')
      .getRawOne();
    const encryptPassword = encrypt(password);
    user.role = role;
    user.password = encryptPassword;
    user.num = maxValue.maxNum+1
    const result = await this.userRepository.save(user);
    return { data: result };
  }

  async handleUpdateUser(updateUser: UpdateUserDto) {
    const { id, roleId, province, num, school, phone, gender, age, grade } =
      updateUser;
    const queryBuilder = this.userRepository.createQueryBuilder('users');
    const isExist = await queryBuilder.where('users.id = :id', { id }).getOne();
    if (!isExist) {
      return customMsg(USER_NOT_EXIST.MSG, USER_NOT_EXIST.CODE);
    }
    const roleQueryBuilder = this.roleRepository.createQueryBuilder('roles');
    const role = await roleQueryBuilder
      .where('roles.id = :id', { id: roleId })
      .getOne();
    if (!role) {
      return customMsg(ROLE_NOT_EXIST.MSG, ROLE_NOT_EXIST.CODE);
    }
    const result = await queryBuilder
      .update(UserEntity)
      .set({
        province,
        num:Number(num),
        school,
        phone,
        gender,
        grade,
        age: Number(age),
        role: role,
      })
      .where('id = :id', { id })
      .execute();
    return { data: result };
  }

  async handleDelete(id: number) {
    const queryBuilder = this.userRepository.createQueryBuilder('users');
    const result = await queryBuilder
      .delete()
      .from(UserEntity)
      .where('id = :id', { id })
      .execute();
    return result;
  }

  async handleResetPwd(resetDto: ResetPwdDto) {
    const { id, password } = resetDto;
    const encryptPassword = encrypt(password);
    const queryBuilder = this.userRepository.createQueryBuilder('users');
    const isExist = await queryBuilder.where('users.id = :id', { id }).getOne();
    if (!isExist) {
      return customMsg(USER_NOT_EXIST.MSG, USER_NOT_EXIST.CODE);
    }
    const result = await queryBuilder
      .update(UserEntity)
      .set({
        password: encryptPassword,
      })
      .where('id = :id', { id })
      .execute();
    return { data: result };
  }

  async handleListByPage(pageNum, pageSize, username) {
    const queryBuilder = this.userRepository.createQueryBuilder('users');
    if(username){
      queryBuilder.where('users.username LIKE :username', { username: `%${username}%` });
    }
    const [users, total] = await queryBuilder
      .skip((pageNum - 1) * pageSize)
      .leftJoinAndSelect('users.role', 'role')
      .leftJoinAndSelect('users.firm', 'firm')
      .take(pageSize)
      .orderBy('users.num', 'DESC')
      .addOrderBy('users.createdAt', 'DESC')
      .getManyAndCount();

    const filterFieldUsers = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    return {
      data: {
        list: filterFieldUsers,
        total,
      },
    };
  }

  async handleGetMenu(id: number) {
    const queryBuilder = this.userRepository.createQueryBuilder('users');
    const result = await queryBuilder
      .leftJoinAndSelect('users.role', 'role')
      .where('users.id = :id', { id })
      .getOne();
    if (!result) {
      throw Error('没找到用户');
    }
    if (!result.role) {
      return { data: [] };
    }
    const roleid = Number(result.role.id);
    const { menuList, allMenu } = await this.roleMenuService.getMenuList(
      roleid,
    );

    const newMenus = menuList.reduce((arr, ml) => {
      const filters = allMenu.filter(
        (menu) =>
          (ml.id === menu.id && !ml.isParent) ||
          Number(ml.parentid) === Number(menu.id),
      );
      return arr.concat(filters);
    }, []);
    const uniqueArray = newMenus.reduce((acc, curr) => {
      if (!acc.some((item) => item.id === curr.id)) {
        acc.push(curr);
      }
      return acc;
    }, []);
    const list = transformToArrayToTree(uniqueArray);
    return { data: list };
  }

  async handleUserInfo(id:number){
    const queryBuilder = this.userRepository.createQueryBuilder('users');
    const result = await queryBuilder
      .leftJoinAndSelect('users.role', 'role')
      .where('users.id = :id', { id })
      .getOne();
    if (!result) {
      return customMsg(USER_NOT_EXIST.MSG, USER_NOT_EXIST.CODE);
    }

    const { password, ...rest } = result;
    return {data:rest}
  }

  async handleGetOne(id) {
    const queryBuilder = this.userRepository.createQueryBuilder('users');
    const result = await queryBuilder
      .leftJoinAndSelect('users.role', 'role')
      .where('users.id = :id', { id })
      .getOne();
    return result;
  }
}
