import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MenuEntity } from "./menu.entity";
import { customMsg, listToTree } from "src/common/utils";
import {  } from "src/common/message";
import { CreateMenuDto } from './dto/createMenu.dto'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>
  ){} 

  async handleCreateMenu(createMenu:CreateMenuDto){
    const menu = this.menuRepository.create(createMenu)
    const { menuname,parentid } = menu
    const queryBuilder = this.menuRepository.createQueryBuilder('menus')
    const isExist = await queryBuilder.where(
      'menus.menuname = :menuname',
      { menuname }
    ).getOne()
    if(isExist){
      
    }
    if(!parentid){
      menu.isParent = true
    }else{
      menu.isParent = false
    }
    const result = await this.menuRepository.save(menu)
    return result
  }

  async handleParentList(){
    const queryBuilder = this.menuRepository.createQueryBuilder('menus')
    const list = await queryBuilder.where(
      'menus.isParent = :isParent',
      { isParent: 1 }
    ).getMany()
    return {
      data:list
    }
  }

  async handleListTree(){
    const listEntity = await this.menuRepository.find()
    const list = listToTree('id','parentid',listEntity)
    return {
      data:list
    }
  }
}