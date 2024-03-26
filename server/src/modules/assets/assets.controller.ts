import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PageParameter } from 'src/pipes/page-parameter.pipe';
import { Public } from 'src/decorators/public.decorator';
import { AssetsService } from './assets.service';
import {
  CreateAssetsDto,
  ListAssetsDto,
  UpdateAssetsDto,
} from './dto/assets.dto';

@Controller('assets')
@ApiTags('资源')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('create')
  @ApiOperation({ summary: '新增' })
  async handleCreate(@Body() body: CreateAssetsDto) {
    return await this.assetsService.handleCreate(body);
  }

  @Get('list')
  @ApiOperation({ summary: '获取资源列表' })
  async handleListByPid(@Query('pid', ParseIntPipe) pid: number) {
    const result = await this.assetsService.handleListByPid(pid);
    return { data: result };
  }

  @Post('delete')
  @ApiOperation({ summary: '根据id删除' })
  async handleDeleteById(@Body('id') id: number) {
    return await this.assetsService.handleDeleteById(id);
  }

  @Post('update')
  @ApiOperation({ summary: '更新' })
  async handleUpdate(@Body() body: UpdateAssetsDto) {
    return await this.assetsService.handleUpdate(body);
  }
}
