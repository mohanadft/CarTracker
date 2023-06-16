import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeAuthService: Partial<AuthService> = {};
  let fakeUserService: Partial<UserService> = {};

  beforeEach(async () => {
    fakeUserService = {
      find: () => Promise.resolve([{ id: 1, email: 'asd', password: 'asd' }]),
      create: () => Promise.resolve({ id: 1, email: '1', password: 'asd' }),
    };

    fakeAuthService = {
      signIn: () => Promise.resolve({ id: 1, email: ',', password: 'asd' }),
      signup: () => Promise.resolve({ id: 1, email: 'asd', password: 'asd' }),
    };

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('can create a controller instance', () => {
    expect(controller).toBeDefined();
  });

  it('find method returns an empty array', async () => {
    const session = { userId: 2 };
    const user = await controller.signin(
      {
        email: 'asd',
        password: 'asd',
      },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
