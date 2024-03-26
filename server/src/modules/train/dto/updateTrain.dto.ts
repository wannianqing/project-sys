import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateTrainDto {
  @ApiProperty({
    type:'number',
    required:true,
    description:'id'
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

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
}