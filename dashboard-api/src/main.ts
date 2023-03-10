import { Container, ContainerModule, interfaces } from 'inversify';
import { ExeptionFilter } from '../errors/exeption.filter';
import { IExeptionFilter } from '../errors/exeption.filter.interface';
import { App } from './app';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UsersController } from './users/users.controller';
import { IUserController } from './users/users.controller.interface';
import { UsersService } from './users/users.service';
import { IUserService } from './users/users.service.interface';

export interface IButstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IUserController>(TYPES.UserController).to(UsersController);
  bind<IUserService>(TYPES.UserService).to(UsersService);
  bind<App>(TYPES.Application).to(App);
});

function butstrap(): IButstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
}

export const { app, appContainer } = butstrap();
