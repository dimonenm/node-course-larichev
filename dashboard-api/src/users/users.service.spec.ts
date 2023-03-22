import { Container } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { UsersService } from './users.service';
import { IUserService } from './users.service.interface';

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
  container.bind<IUserService>(TYPES.UserService).to(UsersService);
});

describe('User Service', () => {
  it('createUser', async () => {});
});
