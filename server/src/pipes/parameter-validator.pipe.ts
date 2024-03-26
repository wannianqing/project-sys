import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

@Injectable()
export class ParameterPipe implements PipeTransform {
  async transform(value,metadata:ArgumentMetadata){
    const DTO = plainToInstance(metadata.metatype,value)
    const errors = await validate(DTO)
    if(errors.length){
      const error = errors[0]
      const msg = error.constraints[Object.keys(error.constraints)[0]]
      // const formats = errors.map((error:ValidationError) => {
      //   return {
      //     [error.property]:error.constraints[Object.keys(error.constraints)[0]]
      //   }
      // })
      throw new HttpException({message:msg},HttpStatus.BAD_REQUEST)
    }
    return value
  }
}
