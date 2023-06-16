import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  const fakeUserService: Partial<UserService> = {
    find: () => Promise.resolve([]),
    findOne: () =>
      Promise.resolve({ id: 1, email: 'mo@gmail.com', password: 'asd' }),
    update: () => Promise.resolve({ raw: '1', affected: 2, generatedMaps: [] }),
  };

  let controller: UserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get(UserController);
  });

  it('can initialize a controller instance', () => {
    expect(controller).toBeDefined();
  });
});
