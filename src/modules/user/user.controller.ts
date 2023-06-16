import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('users')
@Serialize(UserDto)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  find(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, data: UpdateUserDto) {
    return this.userService.update(id, data);
  }
}
