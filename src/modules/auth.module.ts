import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.service';
import { UserModule } from './user.module';
import { AuthController } from 'src/controllers/auth.controller';
import { UserService } from 'src/services/user.service';
import { UserRepository } from 'src/repositories/user/user.prisma';
import { PrismaService } from 'src/prisma.service';
import { JWT_SECRET } from 'enviroments/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, UserService, UserRepository, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }