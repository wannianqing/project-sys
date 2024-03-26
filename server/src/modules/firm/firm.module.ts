import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirmService } from "./firm.service";
import { FirmController } from "./firm.controller";
import { FirmEntity } from "./firm.entity";
import { UserEntity } from "../user/user.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([FirmEntity,UserEntity])
  ],
  controllers:[FirmController],
  providers:[FirmService],
  exports:[FirmService]
})
export class FirmModule {}