import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Query,
  UsePipes,
  Session,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { decrypt } from 'src/common/utils';
import { Public } from 'src/decorators/public.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createDto';
import { ResetPwdDto, UpdateUserDto } from './dto/updateDto';
import { LoginUserDto } from './dto/loginDto';
import { PageParameter } from 'src/pipes/page-parameter.pipe';
import { PageDto } from './dto/page.dto';

@Controller('user')
@ApiTags('用户账号')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: '登录' })
  async handleLoginUser(@Body() loginUser, @Session() session) {
    // const loginInfo = decrypt(loginUser.data)
    return await this.userService.handleLoginUser(loginUser, session.code);
  }

  @Get('info')
  @ApiOperation({ summary: '用户信息' })
  async handleUserInfo(@Req() req) {
    const userid = req.userid;
    return await this.userService.handleUserInfo(userid);
  }

  @Post('create')
  @Public()
  @ApiOperation({ summary: '创建账户' })
  async handleCreateUser(@Body() createUser: CreateUserDto) {
    return await this.userService.handleCreateUser(createUser);
  }

  @Post('update')
  @ApiOperation({ summary: '更新用户' })
  async handleUpdateUser(@Body() updateUser: UpdateUserDto) {
    return await this.userService.handleUpdateUser(updateUser);
  }

  @Post('resetPwd')
  @ApiOperation({ summary: '重置密码' })
  async handleResetPwd(@Body() resetDto: ResetPwdDto) {
    return await this.userService.handleResetPwd(resetDto);
  }

  @Get('list')
  @ApiOperation({ summary: '用户列表' })
  @UsePipes(PageParameter)
  async handleUserList(@Query() page: PageDto) {
    const { pageNum, pageSize, username } = page;
    return await this.userService.handleListByPage(pageNum, pageSize, username);
  }

  @Get('delete')
  async handleDelete(@Query() query) {
    const { id } = query;
    return await this.userService.handleDelete(id);
  }

  @Get('menus')
  @ApiOperation({ summary: '获取用户菜单数据' })
  async handleMenuForUser(@Req() req) {
    const userid = req.userid;
    return await this.userService.handleGetMenu(userid);
  }
}
