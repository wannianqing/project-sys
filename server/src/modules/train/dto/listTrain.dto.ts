import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsInt } from 'class-validator'

export class PageDto {
  @ApiProperty({
    type:'string',
    required:true,
    description:'当前页'
  })
  @IsNumberString()
  pageNum: string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'每页条数'
  })
  @IsNumberString()
  pageSize: string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'类型'
  })
  @IsNumberString()
  type: string;
}