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
      const emailExist = await this.userRepository.findByEmail(email);
      if (emailExist) throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      return this.userRepository.create(newUser);
    } catch (err) {
      return err;
    }
  }

  async update(id: string, user: EditUserDTO) {
    try {
      if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);

      const existedUser = await this.userRepository.listById(id);

      if (!existedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const { email, password, name } = user;
      const updatedUser = await User.build(email, password, name);

      updatedUser.identifier = existedUser.id;
      updatedUser.created_at = existedUser.created_at;
      updatedUser.updatedAt = new Date();
      return this.userRepository.update(id, updatedUser);
    } catch (err) {
      return err;
    }
  }

  async listAll() {
    try {
      return this.userRepository.list();
    } catch (err) {
      return err;
    }
  }

  async listById(id: string) {
    try {
      if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      const existedUser = await this.userRepository.listById(id);
      if (!existedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return existedUser;
    } catch (err) {
      return err
    }
  }

  async findUserByEmail(email: string) {
    try {
      if (!email) throw new HttpException('Wrong data', HttpStatus.BAD_REQUEST);
      const userExist = await this.userRepository.findByEmail(email);
      if (!userExist) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return userExist;
    } catch (err) {
      return err;
    }
  }

  async delete(id: string) {
    try {
      if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      const existedUser = await this.userRepository.listById(id);
      if (!existedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      const user = { ...existedUser, account_status: AccountStatus.DISABLED }
      user.deleted_at = new Date();
      return this.userRepository.delete(id, user);
    } catch (err) {
      return err
    }
  }
}
