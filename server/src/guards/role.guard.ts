import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "src/decorators/role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
  constructor(
    private reflector:Reflector
  ){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get(ROLE_KEY,context.getHandler())
    
    if(!role) return true

    const request = context.switchToHttp().getRequest()
    const user = request.user
    
    return user&&user.roles.some(r=>r===role)
  }
}