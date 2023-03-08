import express, { Express } from 'express'
import { Server } from 'http'
import { ExeptionFilter } from '../errors/exeption.filter'
import { ILogger } from './logger/logger.interface'
import { LoggerService } from './logger/logger.service'
import { UserController } from './users/user.contriller'

export class App {
  app: Express
  server: Server
  port: number
  logger: ILogger
  userCotroller: UserController
  exeptionFilter: ExeptionFilter

  constructor(logger: ILogger, userCotroller: UserController, exeptionFilter: ExeptionFilter) {
    this.app = express()
    this.port = 8000
    this.logger = logger
    this.userCotroller = userCotroller
    this.exeptionFilter = exeptionFilter
  }

  useRoutes() {
    this.app.use('/users', this.userCotroller.router)
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
  }

  public async init() {
    this.useRoutes()
    this.useExeptionFilters()
    this.server = this.app.listen(this.port)
    this.logger.log(`Server has been started http://localhost:${this.port}`);
  }
}