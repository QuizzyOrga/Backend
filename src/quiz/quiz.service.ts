import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(QuizService.name);

  // async create(createQuizDto: CreateQuizDto) {
  //   return await this.prisma.quiz.create({
  //     data: {
  //       title: createQuizDto.title,
  //       createdAt: createQuizDto.createdAt,
  //       creatorId: createQuizDto.creatorId,
  //     },
  //   });
  // }

  async findAll() {
    return await this.prisma.quiz.findMany({
      include: {
        creator: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
      take: 100,
    });
  }

  async findOne(id: number) {
    return await this.prisma.quiz.findUnique({
      where: {
        id: id,
      },
      include: {
        creator: true,
        questions: {
          include: {
            options: true,
          },
        },
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.quiz.delete({
      where: {
        id: id,
      },
    });
  }
}
