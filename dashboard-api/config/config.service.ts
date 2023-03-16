import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../src/logger/logger.interface';
import { TYPES } from '../src/types';
import { IConfigService } from './config.service.interface';
import 'reflect-metadata';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('[ConfigService] Не удалось прочитать фаил .env или он отсутствует');
    } else {
      this.logger.log('[ConfigService] Конфигурация .env загружена');
      this.config = result.parsed as DotenvParseOutput;
    }
  }
  get(key: string): string {
    return this.config[key];
  }
}
