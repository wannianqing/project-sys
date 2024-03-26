import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({
    type:'string',
    required:true,
    description:'角色名称'
  })
  @IsString()
  @IsNotEmpty()
  rolename: string;
  @ApiProperty({
    type:'string',
    required:true,
    description:'角色说明'
  })
  @IsString()
  @IsNotEmpty()
  remark: string;
}