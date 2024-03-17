import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async signIn(email: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findUserByEmail(email);

      if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const { password } = user;

      const comparedPassword = bcrypt.compare(pass, password);

      if (!comparedPassword) throw new HttpException('Credenciais estão com algum erro', HttpStatus.BAD_REQUEST);

      const payload = { ...user };

      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    } catch (e) {
      throw new HttpException('Erro ao gerar token JWT', HttpStatus.BAD_REQUEST);
    }
  }
}
