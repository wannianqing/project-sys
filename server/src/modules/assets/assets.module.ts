import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssetsService } from "./assets.service";
import { AssetsController } from "./assets.controller";
import { AssetsEntity } from "./assets.entity";


@Module({
  imports:[
    TypeOrmModule.forFeature([AssetsEntity])
  ],
  controllers:[AssetsController],
  providers:[AssetsService],
  exports:[AssetsService]
})
export class AssetsModule {}