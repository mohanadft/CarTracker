import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UserDto } from '../user/dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      createUserDto.email,
      createUserDto.password,
    );

    session.userId = user.id;

    return user;
  }

  @Post('signin')
  async signin(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(
      createUserDto.email,
      createUserDto.password,
    );

    session.userId = user.id;

    return user;
  }
}
