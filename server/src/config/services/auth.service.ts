import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BaseService } from './base.service'

@Injectable()
export class AuthConfig extends BaseService {
  constructor(
    configService:ConfigService
  ){
    super(configService)
  }

  get jwtSecret(){
    return this.getString('SESSION_SECRET')
  }

  get publicKey(){
    return this.getString('JWT_PUBLIC_KEY')
  }

  get privateKey(){
    return this.getString('JWT_PRIVATE_KEY')
  }
}