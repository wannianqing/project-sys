import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BaseService } from './base.service'
import type { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { RoleEntity } from "src/modules/role/role.entity";
import { UserEntity } from "src/modules/user/user.entity";
import { MenuEntity } from "src/modules/menu/menu.entity";
import { RoleMenuEntity } from "src/modules/roleMenu/roleMenu.entity";
import { TrainEntity } from "src/modules/train/train.entity";
import { AssetsEntity } from "src/modules/assets/assets.entity";
import { FirmEntity } from "src/modules/firm/firm.entity";
import { ScoreEntity } from "src/modules/score/score.entity";

@Injectable()
export class DatabaseConfig extends BaseService {
  constructor(
    configService:ConfigService
  ){
    super(configService)
  }

  get databaseConfig():TypeOrmModuleOptions {
    return {
      type:'mysql',
      host:this.getString('DATABASE_HOST'),
      port:this.getNumber('DATABASE_PORT'),
      username:this.getString('DATABASE_USERNAME'),
      password:this.getString('DATABASE_PASSWORD'),
      database:this.getString('DATABASE_NAME'),
      entities:[
        RoleEntity, 
        UserEntity, 
        MenuEntity, 
        RoleMenuEntity, 
        TrainEntity,
        AssetsEntity,
        FirmEntity,
        ScoreEntity
      ],
      synchronize:this.getBoolean('DATABASE_SYNCHRONIZE')
    }
  }
}