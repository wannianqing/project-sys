
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateMenuDto {
  @ApiProperty({
    type:'string',
    required:true,
    description:'菜单名称'
  })
  @IsString()
  @IsNotEmpty()
  menuname: string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'父菜单id'
  })
  @IsNumber()
  parentid: number;

  @ApiProperty({
    type:'string',
    required:true,
    description:'组件名称'
  })
  @IsString()
  @IsNotEmpty()
  component: string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'icon图标'
  })
  @IsString()
  icon: string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'路由地址'
  })
  @IsString()
  @IsNotEmpty()
  link: string;
}
