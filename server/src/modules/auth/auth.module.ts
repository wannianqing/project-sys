import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";

import { AuthConfig } from "src/config/services/auth.service";

@Module({
  imports:[
    JwtModule.registerAsync({
      useFactory:(configService:AuthConfig)=>{
        return {
          secret: configService.jwtSecret
        }
      },
      inject:[AuthConfig]
    })
  ],
  providers:[AuthService],
  exports:[AuthService]
})
export class AuthModule {}