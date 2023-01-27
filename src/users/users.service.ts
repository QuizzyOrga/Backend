import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(UsersService.name);

  async create(createUser: CreateUserDto) {
    const user: User = await this.prisma.user.create({
      data: {
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        email: createUser.email,
        password: createUser.password,
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany({
      include: {
        _count: {
          select: {
            quiz: true,
          },
        },
      },
      take: 100,
    });
    return users;
  }

  async findOne(id: number): Promise<User> {
    // Get user by id and mutual friend count
    const user: User = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        _count: {
          select: {
            quiz: true,
          },
        },
      },
    });

    return user;
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
