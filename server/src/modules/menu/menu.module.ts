import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuEntity } from "./menu.entity";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";
import { RoleMenuEntity } from "../roleMenu/roleMenu.entity";


@Module({
  imports:[
    TypeOrmModule.forFeature([MenuEntity,RoleMenuEntity])
  ],
  controllers:[MenuController],
  providers:[MenuService],
  exports:[]
})
export class MenuModule {}