import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(QuestionService.name);

  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  async findAllByQuiz(quizId) {
    return await this.prisma.question.findMany({
      where: {
        quizId: quizId,
      },
      include: {
        quiz: true,
      },
      take: 100,
    });
  }

  async findOne(id: number) {
    return await this.prisma.question.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
function exclude(user: any, arg1: string[]) {
  throw new Error('Function not implemented.');
}
