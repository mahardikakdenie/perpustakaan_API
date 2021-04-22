/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    request.user = await this.validationToken(request.headers.authorization);
    return true;
  }

  async validationToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      // Json web Token
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
    }
    const token = auth.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      return decoded;
    } catch (err) {
      const message = 'Token Error : ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
