import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<AuthEntity> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { email } });

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }
}
