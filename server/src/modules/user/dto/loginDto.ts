import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({
    type:'string',
    required:true,
    description:'加密字段，包含用户名、密码和验证码'
  })
  @IsString()
  data: string;
}