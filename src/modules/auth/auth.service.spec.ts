import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UserService>;
  const users: User[] = [];

  beforeEach(async () => {
    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);

        return Promise.resolve(filteredUsers);
      },
      create: (data: CreateUserDto) => {
        const user = {
          id: ~~(Math.random() * 99999),
          ...data,
        };
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: fakeUserService,
        },
        AuthService,
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create auth service', async () => {
    expect(service).toBeDefined();
  });

  it('does password get hashed', async () => {
    const user = await service.signup('asd@gmail.com', 'asd');

    expect(user.password).not.toEqual('asd');
    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is already used', async () => {
    await service.signup('assafasfasfd@gmail.com', 'asdsdasd');

    // NOTE: You can't use "done" callback with async/await so you could use these two options,
    // There are other solution but stick with these.

    // service
    //   .signup('asd@gmail.com', 'asd')
    //   .then(() => ({}))
    //   .catch(() => done());

    await expect(
      service.signup('assafasfasfd@gmail.com', 'asd'),
    ).rejects.toThrow(BadRequestException);
  });

  it("throws an error if user try to sign in with an email that doesn't exist", async () => {
    await expect(
      service.signIn('aasdasfasfasfasdsd@gmail.com', 'asd'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws an error if user try to sign in with an incorrect password', async () => {
    await service.signup('asdasdasdafasfasdasf@gmail.com', 'assadsdasd');

    await expect(
      service.signIn('asdasdasdafasfasdasf@gmail.com', 'asd'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('asddsa@asads.com', 'mypass');
    const user = await service.signIn('asddsa@asads.com', 'mypass');
    expect(user).toBeDefined();
  });
});
