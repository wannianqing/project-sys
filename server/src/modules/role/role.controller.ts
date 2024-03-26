import {
  Controller,
  Post, Body,
  Get, Query, UsePipes
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { RoleService } from './role.service'
import { RoleMenuService } from '../roleMenu/roleMenu.service'
import { CreateRoleDto } from './dto/createRole.dto'
import { UpdateRoleDto } from './dto/updateRole.dto'
import { PageParameter } from 'src/pipes/page-parameter.pipe'
import { PageDto } from './dto/page.dto'
import { AddMenuDto } from './dto/addMenu.dto'
import { Public } from 'src/decorators/public.decorator'

@Controller('role')
@ApiTags('角色')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly roleMenuService: RoleMenuService
  ){}

  @Post('create')
  @ApiOperation({ summary:'创建角色' })
  @ApiResponse({
    status:200,
    type:CreateRoleDto
  })
  async handleCreateRole(
    @Body() createRole: CreateRoleDto
  ){
    return await this.roleService.handleCreateRole(createRole)
  }

  @Get('list')
  @ApiOperation({ summary:'角色列表' })
  @UsePipes(PageParameter)
  async handleRoleList(
    @Query() page:PageDto
  ){
    const { pageNum, pageSize } = page
    return await this.roleService.handleListByPage(pageNum,pageSize)
  }

  @Get('listAll')
  @ApiOperation({ summary:'获取所有角色' })
  async handleRoleListAll(){
    return await this.roleService.handleRoleListAll()
  }

  @Get('delete')
  async handleDelete(
    @Query() query
  ){
    const { id } = query
    return await this.roleService.handleRoleDelete(id)
  }

  @Post('update')
  @ApiOperation({ summary:'修改角色信息' })
  async handleRoleUpdate(
    @Body() body:UpdateRoleDto
  ){
    return await this.roleService.handleRoleUpdate(body)
  }


  @Post('addMenu')
  @ApiOperation({ summary:'给角色添加菜单' })
  async handleAddMenu(
    @Body() addInfo:AddMenuDto
  ){
    const { roleid, menuIds } = addInfo
    return await this.roleMenuService.addRoleMenu(roleid,menuIds)
  }

  @Get('menuChecked')
  @ApiOperation({ summary:'获取已授权的菜单' })
  async handleGetMenus(
    @Query('id') id:number
  ){
    return await this.roleMenuService.getMenuListForRole(id)
  }
}