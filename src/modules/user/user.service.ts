import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(data: CreateUserDto) {
    const user = this.userRepo.create(data);

    return await this.userRepo.save(user);
  }

  async findOne(id: number) {
    if (!id) return null;

    return await this.userRepo.findOne({ where: { id } });
  }

  async find(email: string) {
    return await this.userRepo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<CreateUserDto>) {
    return await this.userRepo.update({ id }, attrs);
  }

  async delete(id: number) {
    return await this.userRepo.delete({ id });
  }

  async clearAll() {
    return await this.userRepo.clear();
  }
}
