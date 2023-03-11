import { Container, ContainerModule, interfaces } from "inversify";
import { ExeptionFilter } from "../errors/exeption.filter";
import { IExeptionFilter } from "../errors/exeption.filter.interface";
import { App } from "./app";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UsersController } from './users/users.contriller';
import { IUserController } from "./users/users.controller.interface";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService)
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
  bind<IUserController>(TYPES.UserController).to(UsersController)
  bind<App>(TYPES.Application).to(App)
})

function butstrap() {
  const appContainer = new Container()
  appContainer.load(appBindings)
  const app = appContainer.get<App>(TYPES.Application)
  app.init()
  return { app, appContainer }
}

export const { app, appContainer } = butstrap()