import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { UsersService } from './users.service';
import { IUserService } from './users.service.interface';

const ConfigServiseMock: IConfigService = {
  get: jest.fn()
};
const UsersRepositoryMock: IUsersRepository = {
  create: jest.fn(),
  find: jest.fn()
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
  container.bind<IUserService>(TYPES.UserService).to(UsersService);
  container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiseMock);
  container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

  configService = container.get<IConfigService>(TYPES.ConfigService);
  usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
  usersService = container.get<IUserService>(TYPES.UserService);
});

describe('User Service', () => {
  it('createUser', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');
    usersRepository.create = jest.fn().mockImplementationOnce(
      (user: User): UserModel => ({
        name: user.name,
        email: user.email,
        password: user.password,
        id: 1
      })
    );
    const createUser = await usersService.createUser({
      email: 'a@a.ru',
      name: 'Anton',
      password: '1'
    });
    expect(createUser?.id).toEqual(1);
    expect(createUser?.password).not.toEqual('1');
  });
});
