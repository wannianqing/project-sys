import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class UpdateRoleDto {
  @ApiProperty({
    type:'number',
    required:true,
    description:'角色id'
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @ApiProperty({
    type:'string',
    required:true,
    description:'角色说明'
  })
  @IsString()
  @IsNotEmpty()
  remark: string;
}