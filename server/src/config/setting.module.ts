import { Global, Module } from '@nestjs/common'
import { AuthConfig } from './services/auth.service'
import { DatabaseConfig } from './services/database.service'

@Global()
@Module({
  providers:[
    AuthConfig, 
    DatabaseConfig
  ],
  exports:[
    AuthConfig,
    DatabaseConfig
  ]
})
export class SettingModule {}