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
import { FirmService } from './firm.service';
import { CreateFirmDto, PageDto, UpdateFirmDto } from './firm.dto';

@Controller('firm')
@ApiTags('企业')
export class FirmController {
  constructor(private readonly firmService: FirmService) {}

  @Post('create')
  @ApiOperation({ summary: '新增' })
  async handleCreate(@Body() body: CreateFirmDto) {
    return await this.firmService.handleCreate(body);
  }

  @Get('list')
  @ApiOperation({ summary: '企业列表' })
  @UsePipes(PageParameter)
  async handleListByPage(@Query() page: PageDto) {
    const { pageNum, pageSize } = page;
    return await this.firmService.handleListByPage(pageNum, pageSize);
  }

  @Get('delete')
  async handleDelete(@Query() query) {
    const { id } = query;
    return await this.firmService.handleRoleDelete(id);
  }

  @Post('update')
  @ApiOperation({ summary: '更新' })
  async handleUpdate(@Body() body: UpdateFirmDto) {
    return await this.firmService.handleUpdate(body);
  }

  @Get('all')
  @ApiOperation({ summary: '所有企业列表' })
  @Public()
  async handleListAll() {
    return await this.firmService.handleListAll();
  }
}
