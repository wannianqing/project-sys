import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from 'class-validator'

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
    required:false,
    description:'用户名搜索'
  })
  @IsString()
  @IsOptional()
  username: string;
}