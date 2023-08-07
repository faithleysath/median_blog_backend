import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as brcypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await brcypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.password = hashedPassword;
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = await brcypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
      updateUserDto.password = hashedPassword;
    }
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
