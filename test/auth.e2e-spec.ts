import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserService } from '../src/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/modules/user/entities/user.entity';

describe('Authentication System', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User]), AppModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userService = app.get(UserService);
  });

  it('handles a signup request', async () => {
    const testEmail = '1@gmail.com';
    await userService.clearAll();
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: 'asd' })
      .expect(201);

    const { id, email } = res.body;

    expect(id).toBeDefined();
    expect(email).toEqual(testEmail);
  });

  it('handles a signup request', async () => {
    const testEmail = '1@gmail.com';
    await userService.clearAll();
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: 'asd' })
      .expect(201);

    const { id, email } = res.body;

    expect(id).toBeDefined();
    expect(email).toEqual(testEmail);
  });

  it('handles a signup request', async () => {
    const email = '1@gmail.com';
    await userService.clearAll();

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asd' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const resss = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(resss.body.email).toEqual(email);
  });
});
