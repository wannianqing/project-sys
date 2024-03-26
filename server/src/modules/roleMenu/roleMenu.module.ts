import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenuService } from "./roleMenu.service";
import { RoleEntity } from "../role/role.entity";
import { MenuEntity } from "../menu/menu.entity";
import { RoleMenuEntity } from "./roleMenu.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([
      RoleEntity,
      MenuEntity,
      RoleMenuEntity
    ])
  ],
  providers:[RoleMenuService],
  exports:[RoleMenuService]
})
export class RoleMenuModule {}