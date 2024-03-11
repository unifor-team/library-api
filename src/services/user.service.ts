import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user/User';
import { CreateUserDTO } from 'src/models/user/create-dto';
import { UserRepository } from 'src/repositories/user/user.prisma';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async create(user: CreateUserDTO) {
    const { email, password, name } = user;
    const newUser = await User.build(email, password, name);
    return this.userRepository.create(newUser);
  }
}
