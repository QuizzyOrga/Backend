import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return `Hello, ${process.env.NAME}!`;
  }

  getAuth(userId: number, token: string): string {
    return 'Authentication ok !\n userId: ' + userId + '\n token: ' + token;
  }

  async globalUsersCount(): Promise<number> {
    const count = await this.prisma.user.count();
    return count;
  }
}
