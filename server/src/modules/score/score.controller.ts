import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UsePipes,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ScoreService } from './score.service';
import { PageParameter } from 'src/pipes/page-parameter.pipe';
import { BatchScoreCreate, CreateScoreDto, PageDto } from './score.dto';

@Controller('score')
@ApiTags('角色')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post('create')
  @ApiOperation({ summary: '新增一条分数数据' })
  async handleCreate(@Body() createData: CreateScoreDto, @Req() req) {
    const userid = req.userid;
    const username = req.username;
    return this.scoreService.scoreCreate(createData, { userid, username });
  }

  @Post('batch/create')
  @ApiOperation({ summary: '批量导入数据' })
  async batchScoreCreate(@Body() body: BatchScoreCreate) {
    return this.scoreService.batchScoreCreate(body);
  }

  @Get('list')
  @ApiOperation({ summary: '获取列表' })
  @UsePipes(PageParameter)
  async handleList(@Query() page: PageDto, @Req() req) {
    const userid = req.userid;
    const { pageNum, pageSize } = page;
    return this.scoreService.scoreList({ userid });
  }

  @Get('list/userid')
  @ApiOperation({ summary: '获取列表' })
  @UsePipes(PageParameter)
  async handleListByUserid(@Query() query) {
    const userid = query.userid;
    return this.scoreService.scoreListByUserid(userid);
  }
}
