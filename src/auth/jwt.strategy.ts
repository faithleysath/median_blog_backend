import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './auth.module';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate({ userId }: { userId: number }) {
    try {
      return await this.usersService.findOne(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException(`User #${userId} doesn't exist`);
      } else {
        throw error;
      }
    }
  }
}
