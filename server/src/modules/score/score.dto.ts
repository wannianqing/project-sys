import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class CreateScoreDto {
  @ApiProperty({
    type: 'number',
    required: true,
    description: '测试距离',
  })
  @IsNumber()
  @IsNotEmpty()
  distance: number;

  @ApiProperty({
    type: 'number',
    required: true,
    description: '当前等级',
  })
  @IsNumber()
  @IsNotEmpty()
  currentLevel: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: '选择哪只眼睛',
  })
  @IsString()
  @IsNotEmpty()
  eye: string;
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

export class BatchScoreCreate {
  @ApiProperty({
    type: 'number',
    required: true,
    description: '用户id',
  })
  @IsNumber()
  @IsNotEmpty()
  userid: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'excel地址',
  })
  @IsString()
  @IsNotEmpty()
  url: string;
}
