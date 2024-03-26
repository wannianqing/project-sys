import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScoreController } from "./score.controller";
import { ScoreService } from "./score.service";
import { ScoreEntity } from "./score.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports:[
    UserModule,
    TypeOrmModule.forFeature([ScoreEntity])
  ],
  controllers:[ScoreController],
  providers:[ScoreService],
  exports:[ScoreService]
})
export class ScoreModule {}