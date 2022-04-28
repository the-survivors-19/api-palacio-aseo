import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

interface getPassword {
  id: number;
  password: string;
}

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { };

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const res = await this.userRepository.insert(createUserDto);
    return res ? true : false;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { photo, ...other } = updateUserDto;
    console.log(photo);
    return await this.userRepository.update(id, other) ? true : false;
  }

  async remove(id: number) {
    return await this.userRepository.update(id, {
      state: false
    });
  }

  async findEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }
}
