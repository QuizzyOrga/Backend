import { Injectable, Logger } from '@nestjs/common';
import { FriendshipStatus, PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(UsersService.name);

  async create(createUser: CreateUserDto) {
    const user: User = await this.prisma.user.create({
      data: {
        firstname: createUser.firstname,
        lastname: createUser.lastname,
        email: createUser.email,
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany({ take: 100 });
    return users;
  }

  async findOne(id: number): Promise<User> {
    // Get user by id and mutual friend count
    const user: User = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      // Include mutual friends count, if fromFriendship is status accepted
    });

    return user;
  }

  update(id: number, updateUser: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
