import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TRAIN_EXIST, TRAIN_NOT_EXIST } from "src/common/message";
import { customMsg } from "src/common/utils";
import { CreateTrainDto } from "./dto/createTrain.dto";
import { TrainEntity } from "./train.entity";
import { UpdateTrainDto } from "./dto/updateTrain.dto";
import { AssetsService } from "../assets/assets.service";

@Injectable()
export class TrainService {
  constructor(
    @InjectRepository(TrainEntity)
    private readonly trainRepository: Repository<TrainEntity>,
    private readonly assetsService:AssetsService
  ){} 

  async handleCreate(createTrain:CreateTrainDto){
    const trainIns = this.trainRepository.create(createTrain)
    const { name } = trainIns
    const queryBuilder = this.trainRepository.createQueryBuilder('trains')
    const isExist = await queryBuilder.where(
      'trains.name = :name',
      { name }
    ).getOne()
    if(isExist){
      return customMsg(TRAIN_EXIST.MSG,TRAIN_EXIST.CODE)
    }
    const result = await this.trainRepository.save(trainIns)
    return result
  }

  async handleList({
    pageNum, pageSize, type
  }){
    const queryBuilder = this.trainRepository.createQueryBuilder('trains')
    const [role,total] = await queryBuilder.skip((pageNum-1)*pageSize)
      .take(pageSize)
      .where('trains.type = :type',{ type })
      .getManyAndCount()
    return {
      data:{
        list:role,
        total
      }
    }
  }

  async handleUpdate(updateTrain:UpdateTrainDto){
    const { id, cover, intro } = updateTrain
    const queryBuilder = this.trainRepository.createQueryBuilder('trains')
    const train = await queryBuilder.where(
      'trains.id = :id', { id }
    ).getOne()

    if(!train){
      return customMsg(TRAIN_NOT_EXIST.MSG,TRAIN_NOT_EXIST.CODE)
    }
    const result = await queryBuilder.update(TrainEntity)
      .set({
        cover:cover,
        intro:intro
      })
      .where('id = :id',{ id })
      .execute()
    return result
  }

  async handleDelete(id:number){
    await this.assetsService.handleDeleteByPid(id)
    const queryBuilder = this.trainRepository.createQueryBuilder('trains')
    const train = await queryBuilder.where(
      'trains.id = :id', { id }
    ).getOne()

    if(!train){
      return customMsg(TRAIN_NOT_EXIST.MSG,TRAIN_NOT_EXIST.CODE)
    }
    const result = await queryBuilder.delete().from(TrainEntity)
      .where('id = :id', { id })
      .execute()
    return result
  }
}