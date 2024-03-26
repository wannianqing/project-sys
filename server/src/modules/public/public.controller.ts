import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Session,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as captcha from 'svg-captcha';
import { Public } from 'src/decorators/public.decorator';
import { decrypt } from 'src/common/utils';

@Controller('public')
@ApiTags('公共')
export class PublicController {
  constructor() {}
  @Get('test')
  @Public()
  @ApiOperation({ summary: '测试接口', description: '为axios测试所写的' })
  handleGetTest() {
    return {
      msg: '测试通过',
    };
  }
  @Post('test')
  @Public()
  @ApiOperation({ summary: '测试接口', description: '为axios测试所写的' })
  handlePostErr() {
    throw new HttpException({ message: '参数错误' }, HttpStatus.BAD_REQUEST);
  }
  @Post('crypto')
  @Public()
  @ApiOperation({ summary: '测试参数加密', description: '为axios测试所写的' })
  handleCrypto(@Body() parameter) {
    const info = decrypt(parameter.data);
    return {
      data: {
        crypto: parameter.data,
        decrypto: info,
      },
    };
  }
  /**
   * svg图形验证码
   * @param req
   * @returns
   */
  @Get('code')
  @Public()
  @ApiOperation({ summary: '获取图形验证码', description: '获取图形验证码' })
  handleGetCode(@Session() session, @Res() res) {
    const svgObj = captcha.create({
      size: 4,
      fontSize: 75,
      width: 120,
      height: 40,
      background: '#cc9966',
    });

    session.code = svgObj.text;
    res.type('image/svg+xml');
    res.send(svgObj.data);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  handleUpload(@UploadedFile() file) {
    return { data: `http://192.168.1.5:3000/${file.filename}` };
  }
}
