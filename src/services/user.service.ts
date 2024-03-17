import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/models/user/User';
import { AccountStatus } from 'src/models/user/account-status-enum';
import { CreateUserDTO } from 'src/models/user/create-dto';
import { EditUserDTO } from 'src/models/user/edit-dto';
import { UserRepository } from 'src/repositories/user/user.prisma';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async create(user: CreateUserDTO) {
    console.log(user)
    try {
      const { email, password, name } = user;
      const newUser = await User.build(email, password, name);
      const emailExist = this.findUserByEmail(email);
      if (emailExist) throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      return this.userRepository.create(newUser);
    } catch (err) {
      console.log(err)
    }
  }

  async update(id: string, user: EditUserDTO) {
    if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);

    const existedUser = await this.userRepository.listById(id);

    if (!existedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const { email, password, name } = user;
    const updatedUser = await User.build(email, password, name);

    updatedUser.identifier = existedUser.id;
    updatedUser.created_at = existedUser.created_at;
    updatedUser.updatedAt = new Date();
    return this.userRepository.update(id, updatedUser);
  }

  async listAll() {
    return this.userRepository.list();
  }

  async listById(id: string) {
    if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const existedUser = await this.userRepository.listById(id);
    if (!existedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return existedUser;
  }

  async findUserByEmail(email: string) {
    if (!email) throw new HttpException('Wrong data', HttpStatus.BAD_REQUEST);
    return this.userRepository.findByEmail(email);
  }

  async delete(id: string) {
    if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const existedUser = await this.userRepository.listById(id);
    if (!existedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const user = { ...existedUser, account_status: AccountStatus.DISABLED }
    user.deleted_at = new Date();
    return this.userRepository.delete(id, user);
  }
}
