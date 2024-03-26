import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    type:'string',
    required:true,
    description:'用户姓名'
  })
  @IsString()
  @IsNotEmpty()
  username:string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'账户密码'
  })
  password:string;

  @ApiProperty({
    type:'number',
    required:true,
    description:'性别'
  })
  gender:number;

  @ApiProperty({
    type:'number',
    required:true,
    description:'年龄'
  })
  age:number;

  @ApiProperty({
    type:'string',
    required:true,
    description:'学校'
  })
  school:string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'年级'
  })
  grade:string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'电话号码'
  })
  phone:string;

  @ApiProperty({
    type:'number',
    required:true,
    description:'类型'
  })
  type:number;

  @ApiProperty({
    type:'number',
    required:false,
    description:'企业'
  })
  firmId:number;
}