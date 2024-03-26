import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsArray } from 'class-validator'

export class AddMenuDto {
  @ApiProperty({
    type:'number',
    required:true,
    description:'角色id'
  })
  @IsNumber()
  @IsNotEmpty()
  roleid:number;

  @ApiProperty({
    type:[Number],
    required:true,
    description:'菜单id集合'
  })
  @IsArray()
  @IsNotEmpty()
  menuIds:number[];
}