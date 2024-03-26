import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from 'class-validator'

export class DeleteTrainDto {
  @ApiProperty({
    type:'number',
    required:true,
    description:'id'
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}