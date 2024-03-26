import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private jwtService:JwtService,
  ){}

  /** 生成token */
  public async createToken(data){
    const token = await this.jwtService.signAsync({
      userid: data.id,
      username: data.username,
      type: 'ACCESS_TOKEN'
    })
    return token
  }

  public async verifyToken(hash){
    return await this.jwtService.verifyAsync(hash)
  }
}