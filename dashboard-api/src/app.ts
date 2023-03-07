import express, { Express } from 'express'
import { Server } from 'http'
import { LoggerService } from './logger/logger.service'
import { UserController } from './users/user.contriller'

export class App {
  app: Express
  server: Server
  port: number
  logger: LoggerService
  userCotroller: UserController

  constructor(logger: LoggerService, userCotroller: UserController) {
    this.app = express()
    this.port = 8000
    this.logger = logger
    this.userCotroller = userCotroller
  }

  useRoutes() {
    this.app.use('/users', this.userCotroller.router)
  }

  useExeptionFilters(){}

  public async init() {
    this.useRoutes()
    this.useExeptionFilters()
    this.server = this.app.listen(this.port)
    this.logger.log(`Server has been started http://localhost:${this.port}`);
  }
}