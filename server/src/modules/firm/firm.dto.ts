import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsNumber,
} from 'class-validator';

export class CreateFirmDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: '企业名称',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: '企业地址',
  })
  @IsString()
  @IsNotEmpty()
  addr: string;
}

export class PageDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: '当前页',
  })
  @IsNumberString()
  pageNum: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: '每页条数',
  })
  @IsNumberString()
  pageSize: string;
}

export class UpdateFirmDto {
  @ApiProperty({
    type: 'number',
    required: true,
    description: 'id',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: '企业名称',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: '企业地址',
  })
  @IsString()
  @IsNotEmpty()
  addr: string;
}
