import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateTrainDto {
  @ApiProperty({
    type:'string',
    required:true,
    description:'标题'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'封面'
  })
  @IsString()
  @IsNotEmpty()
  cover: string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'说明'
  })
  @IsString()
  @IsNotEmpty()
  intro: string;

  @ApiProperty({
    type:'number',
    required:true,
    description:'类型'
  })
  @IsNumber()
  @IsNotEmpty()
  type: number;
}