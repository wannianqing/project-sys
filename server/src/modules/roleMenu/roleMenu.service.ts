import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { RoleMenuEntity } from "./roleMenu.entity";
import { RoleEntity } from "../role/role.entity";
import { MenuEntity } from "../menu/menu.entity";
import { ROLE_NOT_EXIST } from "src/common/message";
import { customMsg } from "src/common/utils";

@Injectable()
export class RoleMenuService {
  constructor(
    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>
  ){} 

  async addRoleMenu(roleid:number,menuIds:number[]){
    const roleQuery = this.roleRepository.createQueryBuilder('roles')
    const role = await roleQuery.where(
      'roles.id = :id',
      { id: roleid }
    ).getOne()
    if(!role){
      return customMsg(ROLE_NOT_EXIST.MSG,ROLE_NOT_EXIST.CODE)
    }

    const menuQuery = this.menuRepository.createQueryBuilder('menus')
    const menus = await menuQuery.where(
      'menus.id IN (:...menuIds)',
      { menuIds }
    ).getMany()
    
    const roleMenuQuery = this.roleMenuRepository.createQueryBuilder('role_menu')
    const existRoleMenus = await roleMenuQuery.innerJoinAndSelect('role_menu.role','roles')
      .innerJoinAndSelect('role_menu.menu','menus')
      .where('roles.id = :roleid AND menus.id IN (:...menuIds)',{ roleid, menuIds})
      .getMany()
    
    // 过滤出已经在同一个角色上添加的菜单，并且组成新的 roleMenus
    const addRoleMenu = menus.filter(
      menu => !existRoleMenus.some(rm => rm.menu.id === menu.id)
    ).map(menu => ({ menu, role }))
    
    // 当前角色所包含的所有菜单
    const allMenusForRole = await roleMenuQuery.where(
      'roles.id = :roleid',
      {roleid}
    ).getMany()
    // 要删除的数据
    const removeRoleMenu = allMenusForRole.filter(
      item => !existRoleMenus.some(
        savedItem => item.id === savedItem.id && item.role.id === savedItem.role.id
      )
    );
    let result
    if(!addRoleMenu.length && removeRoleMenu.length){
      const ids = removeRoleMenu.map(item => item.id)
      // 有删除的，没有新增的   走删除
      result = await roleMenuQuery.delete().from(RoleMenuEntity)
        .where('id IN (:...ids)', { ids })
        .execute()
    }
    if(addRoleMenu.length && !removeRoleMenu.length){
      // 有新增的，没有删除的   走新增
      result = await this.roleMenuRepository.save(addRoleMenu)
    }
    if(!addRoleMenu.length && !removeRoleMenu.length){
      // 即没删除，也没新增
      result = null
    }
    if(addRoleMenu.length && removeRoleMenu.length){
      // 既有删除，也有新增
      const ids = removeRoleMenu.map(item => item.id)
      await roleMenuQuery.delete().from(RoleMenuEntity)
        .where('id IN (:...ids)', { ids })
        .execute()
      result = await this.roleMenuRepository.save(addRoleMenu)
    }
    return {
      data: result
    }
  }
  
  async getMenuListForRole(roleid:number){
    const menuQuery = this.menuRepository.createQueryBuilder('menus')
    const menuList = await menuQuery.leftJoinAndSelect('menus.roleMenus','role_menu')
      .where('role_menu.roleId = :roleid', { roleid })
      .getMany()
    const menuIds = menuList.map(menu => menu.id)
    return { data: menuIds }
  }

  async getMenuList(roleid:number){
    const menuQuery = this.menuRepository.createQueryBuilder('menus')
    const menuList = await menuQuery.leftJoinAndSelect('menus.roleMenus','role_menu')
      .where('role_menu.roleId = :roleid', { roleid })
      .getMany()
    
    const allMenu = await this.menuRepository.find()

    return {
      menuList,
      allMenu
    }
  }
}