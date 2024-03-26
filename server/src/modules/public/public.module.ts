import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname, basename } from 'path';
import { PublicController } from './public.controller';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../../', 'static'),
        filename: (_, file, callback) => {
          const sufix = extname(file.originalname);
          const fileName = `${new Date().getTime()}${sufix}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [PublicController],
})
export class PublicModule {}
