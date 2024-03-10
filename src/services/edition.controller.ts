import { Injectable } from '@nestjs/common';

@Injectable()
export class EditionService {
  getHello(): string {
    return 'Hello World!';
  }
}
