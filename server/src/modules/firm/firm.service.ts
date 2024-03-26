import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FIRM_NOT_EXIST, FIRM_EXIST } from 'src/common/message';
import { customMsg } from 'src/common/utils';
import { FirmEntity } from './firm.entity';
import { ApiOperation } from '@nestjs/swagger';
import { CreateFirmDto, UpdateFirmDto } from './firm.dto';

@Injectable()
export class FirmService {
  constructor(
    @InjectRepository(FirmEntity)
    private readonly firmRepository: Repository<FirmEntity>,
  ) {}

  async handleCreate(body: CreateFirmDto) {
    const { name } = body;
    const queryBuilder = this.firmRepository.createQueryBuilder('firm');
    const isExist = await queryBuilder
      .where('firm.name = :name', { name })
      .getOne();

    if (isExist) {
      return customMsg(FIRM_EXIST.MSG, FIRM_EXIST.CODE);
    }
    const firmIns = this.firmRepository.create(body);
    const result = await this.firmRepository.save(firmIns);
    return { data: result };
  }

  async handleListByPage(pageNum, pageSize) {
    const queryBuilder = this.firmRepository.createQueryBuilder('firm');
    const [firm, total] = await queryBuilder
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return {
      data: {
        list: firm,
        total,
      },
    };
  }

  async handleRoleDelete(id: string) {
    const queryBuilder = this.firmRepository.createQueryBuilder('firm');
    const isExist = await queryBuilder.where('firm.id = :id', { id }).getOne();
    if (!isExist) {
      return customMsg(FIRM_NOT_EXIST.MSG, FIRM_NOT_EXIST.CODE);
    }
    const result = await queryBuilder
      .delete()
      .from(FirmEntity)
      .where('id = :id', { id })
      .execute();

    return { data: result };
  }

  async handleUpdate(updateTrain: UpdateFirmDto) {
    const { id, addr, name } = updateTrain;
    const queryBuilder = this.firmRepository.createQueryBuilder('firm');
    const firm = await queryBuilder.where('firm.id = :id', { id }).getOne();

    if (!firm) {
      return customMsg(FIRM_NOT_EXIST.MSG, FIRM_NOT_EXIST.CODE);
    }
    const result = await queryBuilder
      .update(FirmEntity)
      .set({
        name: name,
        addr: addr,
      })
      .where('id = :id', { id })
      .execute();
    return result;
  }

  async handleListAll() {
    const list = await this.firmRepository.find();
    return { data: list };
  }
}
