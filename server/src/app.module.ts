import { Module } from '@nestjs/common';
import { join } from 'path';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './guards/auth.guard';
import { HttpExceptionFilter } from './filters/exception.filter';
import { ParameterPipe } from './pipes/parameter-validator.pipe';
import { TransformResponseInterceptor } from './interceptors/response.interceptor';
import { DatabaseConfig } from './config/services/database.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './modules/user/user.module';
import { SettingModule } from './config/setting.module';
import { PublicModule } from './modules/public/public.module';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';
import { RoleMenuModule } from './modules/roleMenu/roleMenu.module';
import { AuthModule } from './modules/auth/auth.module';
import { TrainModule } from './modules/train/train.module';
import { AssetsModule } from './modules/assets/assets.module';
import { FirmModule } from './modules/firm/firm.module';
import { ScoreModule } from './modules/score/score.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [SettingModule],
      useFactory: (configService: DatabaseConfig) =>
        configService.databaseConfig,
      inject: [DatabaseConfig],
    }),
    PublicModule,
    AuthModule,
    UserModule,
    RoleModule,
    SettingModule,
    MenuModule,
    RoleMenuModule,
    TrainModule,
    AssetsModule,
    FirmModule,
    ScoreModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformResponseInterceptor },
    { provide: APP_PIPE, useClass: ParameterPipe },
  ],
})
export class AppModule {}
