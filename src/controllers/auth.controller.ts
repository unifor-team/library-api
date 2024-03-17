import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { httpResponse } from 'helpers/response';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginData: { email: string, password: string }) {
    try {
      return this.authService.signIn(loginData.email, loginData.password);
    } catch (error) {
      return httpResponse(error.msg, error.statusCode);
    }
  }
}