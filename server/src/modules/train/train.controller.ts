import {
  Controller,
  Post, Body,
  Get, Query, UsePipes, ParseIntPipe
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { PageParameter } from 'src/pipes/page-parameter.pipe'
import { Public } from 'src/decorators/public.decorator'

import { TrainService } from './train.service'
import { CreateTrainDto } from './dto/createTrain.dto'
import { PageDto } from './dto/listTrain.dto'
import { UpdateTrainDto } from './dto/updateTrain.dto'
import { DeleteTrainDto } from './dto/delete.dto'

@Controller('train')
@ApiTags('训练类型')
export class TrainController {
  constructor(
    private readonly trainService:TrainService
  ){}

  @Get()
  @Public()
  async handleTest(){
    return {
      data:null
    }
  }

  @Post('create')
  @ApiOperation({ summary:'新增' })
  async handleCreate(
    @Body() body:CreateTrainDto
  ){
    return await this.trainService.handleCreate(body)
  }

  @Get('list')
  @ApiOperation({ summary:'根据类型查找' })
  @UsePipes(PageParameter)
  async handleList(
    @Query() query:PageDto
  ){
    return await this.trainService.handleList(query)
  }

  @Post('update')
  @ApiOperation({ summary:'更新' })
  async handleUpdate(
    @Body() body:UpdateTrainDto
  ){
    return await this.trainService.handleUpdate(body)
  }

  @Post('delete')
  @ApiOperation({ summary:'删除' })
  async handleDelete(
    @Body() body:DeleteTrainDto
  ){
    const { id } = body
    return await this.trainService.handleDelete(id)
  }
}