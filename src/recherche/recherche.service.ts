import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RechercheService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(RechercheService.name);

  async recherche(query: string) {
    const results = await this.prisma.quiz.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          //{ content: { contains: query, mode: 'insensitive' } },
        ],
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
    return results;
  }
}
