import { ExeptionFilter } from "../errors/exeption.filter";
import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UserController } from './users/user.contriller';

async function bootstrap() {
  const logger = new LoggerService()
  const app = new App(logger, new UserController(logger), new ExeptionFilter(logger))
  await app.init()
}

bootstrap()