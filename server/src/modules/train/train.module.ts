import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrainService } from "./train.service";
import { TrainController } from "./train.controller";
import { TrainEntity } from "./train.entity";
import { AssetsModule } from "../assets/assets.module";

@Module({
  imports:[
    AssetsModule,
    TypeOrmModule.forFeature([TrainEntity])
  ],
  controllers:[TrainController],
  providers:[TrainService],
  exports:[TrainService]
})
export class TrainModule {}