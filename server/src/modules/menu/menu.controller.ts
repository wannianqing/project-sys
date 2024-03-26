import {
  Controller,
  Get, Post,
  Body, Query, UsePipes
} from '@nestjs/common'
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MenuService } from './menu.service'
import { CreateMenuDto } from './dto/createMenu.dto'

@Controller('menu')
@ApiTags('菜单模块')
export class MenuController {
  constructor(
    private menuService:MenuService
  ){}

  @Post('add')
  @ApiOperation({ summary:'添加菜单' })
  async handleCreateMenu(
    @Body() createMenu: CreateMenuDto
  ){
    return await this.menuService.handleCreateMenu(createMenu)
  }

  @Get('parent/list')
  @ApiOperation({ summary:'所有父菜单' })
  async handleParentList(){
    return await this.menuService.handleParentList()
  }

  @Get('list')
  @ApiOperation({ summary:'获取树形菜单' })
  async handleListTree(){
    return await this.menuService.handleListTree()
  }
}