import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "../role/role.entity";
import { RoleModule } from "../role/role.module";
import { RoleMenuModule } from "../roleMenu/roleMenu.module";
import { FirmModule } from "../firm/firm.module";
import { FirmEntity } from "../firm/firm.entity";

@Module({
  imports:[
    AuthModule, RoleModule, RoleMenuModule, FirmModule,
    TypeOrmModule.forFeature([UserEntity,RoleEntity,FirmEntity])
  ],
  controllers:[UserController],
  providers:[UserService],
  exports:[UserService]
})
export class UserModule {}