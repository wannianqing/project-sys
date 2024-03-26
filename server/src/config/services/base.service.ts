import { ConfigService } from '@nestjs/config'
import { isNil } from 'lodash';

export class BaseService {
  constructor(
    protected configService:ConfigService
  ){}

  protected get(key:string):string {
    const value = this.configService.get<string>(key);
    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }
    return value;
  }

  protected getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  protected getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }
  protected getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }
} 