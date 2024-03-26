import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ASSETS_EXIST, ASSETS_NOT_EXIST } from 'src/common/message';
import { customMsg } from 'src/common/utils';
import { AssetsEntity } from './assets.entity';
import { CreateAssetsDto, UpdateAssetsDto } from './dto/assets.dto';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetsEntity)
    private readonly assetsRepository: Repository<AssetsEntity>,
  ) {}

  async handleCreate(body: CreateAssetsDto) {
    const { name, pid } = body;
    const queryBuilder = this.assetsRepository.createQueryBuilder('assets');
    const assets = await queryBuilder
      .where('assets.name = :name AND assets.pid = :pid', { name, pid })
      .getOne();

    if (assets) {
      return customMsg(ASSETS_EXIST.MSG, ASSETS_EXIST.CODE);
    }
    const assetsIns = this.assetsRepository.create(body);
    const result = await this.assetsRepository.save(assetsIns);
    return result;
  }

  async handleListByPid(pid: number) {
    const queryBuilder = this.assetsRepository.createQueryBuilder('assets');
    const assets = await queryBuilder
      .where('assets.pid = :pid', { pid })
      .getMany();

    return assets;
  }

  async handleDeleteById(id: number) {
    const queryBuilder = this.assetsRepository.createQueryBuilder('assets');
    const result = await queryBuilder
      .delete()
      .from(AssetsEntity)
      .where('id = :id', { id })
      .execute();
    return result;
  }

  async handleDeleteByPid(pid: number) {
    const queryBuilder = this.assetsRepository.createQueryBuilder('assets');
    const result = await queryBuilder
      .delete()
      .from(AssetsEntity)
      .where('pid = :pid', { pid })
      .execute();

    return result;
  }

  async handleUpdate(updateTrain: UpdateAssetsDto) {
    const { id, train, type, name } = updateTrain;
    const queryBuilder = this.assetsRepository.createQueryBuilder('assets');
    const assets = await queryBuilder.where('assets.id = :id', { id }).getOne();

    if (!assets) {
      return customMsg(ASSETS_NOT_EXIST.MSG, ASSETS_NOT_EXIST.CODE);
    }
    const result = await queryBuilder
      .update(AssetsEntity)
      .set({
        name: name,
        train: train,
        type: type,
      })
      .where('id = :id', { id })
      .execute();
    return result;
  }
}
