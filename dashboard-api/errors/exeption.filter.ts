import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../src/logger/logger.service';
import { IExeptionFilter } from './exeption.filter.interface';

export class ExeptionFilter implements IExeptionFilter{
  logger: LoggerService
  constructor(logger: LoggerService) {
    this.logger = logger
  }
  catch(err: Error, req: Request, res: Response, next: NextFunction) {
    this.logger.error(`${err.message}`)
    res.status(500).send({err: err.message})
  }
}