import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common'
import { map } from 'rxjs'

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context:ExecutionContext, next:CallHandler){
    return next.handle().pipe(
      map((data:any) => {
        const ctx = context.switchToHttp();
        const { url } = ctx.getRequest()
        const pathUrl = url.split('?')[0]
        if(pathUrl === '/public/code') return
        if(data.code == undefined){
          data.code = HttpStatus.OK
        }
        if(!data.msg){
          data.msg = 'success'
        }
        if(!data.data){
          data.data = null
        }
        return {
          code:data.code,
          msg:data.msg,
          data:data.data
        }
      })
    )
  }
}