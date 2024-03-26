import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
@Injectable()
export class PageParameter implements PipeTransform{
  transform(value: any, metadata: ArgumentMetadata) {
    const { pageNum, pageSize, type } = value
    value.pageNum = parseInt(pageNum)
    value.pageSize = parseInt(pageSize)
    if(type){
      value.type = parseInt(type)
    }
    return value
  }
}