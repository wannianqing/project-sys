import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({
    type:'number',
    required:true,
    description:'用户id'
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type:'string',
    required:true,
    description:'城市'
  })
  @IsString()
  @IsNotEmpty()
  province:string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'序号'
  })
  @IsString()
  @IsNotEmpty()
  num: string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'学校'
  })
  @IsString()
  @IsNotEmpty()
  school:string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'手机号'
  })
  @IsString()
  @IsNotEmpty()
  phone:string;

  @ApiProperty({
    type:'number',
    required:true,
    description:'电话号码'
  })
  @IsNumber()
  @IsNotEmpty()
  gender:number;

  @ApiProperty({
    type:'string',
    required:true,
    description:'年龄'
  })
  @IsString()
  @IsNotEmpty()
  age:string;

  @ApiProperty({
    type:'string',
    required:true,
    description:'年级'
  })
  @IsString()
  @IsNotEmpty()
  grade:string;

  @ApiProperty({
    type:'number',
    required:true,
    description:'角色'
  })
  @IsNumber()
  @IsNotEmpty()
  roleId:number;
}

export class ResetPwdDto {
  @ApiProperty({
    type:'number',
    required:true,
    description:'用户id'
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type:'string',
    required:true,
    description:'新密码'
  })
  @IsString()
  @IsNotEmpty()
  password:string;
}