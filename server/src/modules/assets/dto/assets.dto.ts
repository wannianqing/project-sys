import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAssetsDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: '文件名称',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: '资源url地址',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    type: 'number',
    required: true,
    description: '资源类型',
  })
  @IsNumber()
  @IsNotEmpty()
  type: number;

  @ApiProperty({
    type: 'number',
    required: true,
    description: '父级id',
  })
  @IsNumber()
  @IsNotEmpty()
  pid: number;
}

export class ListAssetsDto {
  @ApiProperty({
    type: 'number',
    required: true,
    description: '父级id',
  })
  @IsNumber()
  @IsNotEmpty()
  pid: number;
}

export class UpdateAssetsDto {
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
    description: '资源名称',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'number',
    required: true,
    description: '资源类型',
  })
  @IsNumber()
  @IsNotEmpty()
  type: number;

  @ApiProperty({
    type: 'number',
    required: true,
    description: '训练类型',
  })
  @IsNumber()
  @IsNotEmpty()
  train: number;
}
