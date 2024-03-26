import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { RoleEntity } from "./role.entity";
import { RoleMenuEntity } from "../roleMenu/roleMenu.entity";
import { RoleMenuModule } from "../roleMenu/roleMenu.module";
import { UserEntity } from "../user/user.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([RoleEntity,RoleMenuEntity,UserEntity]),
    RoleMenuModule
  ],
  controllers:[RoleController],
  providers:[RoleService],
  exports:[RoleService]
})
export class RoleModule {}