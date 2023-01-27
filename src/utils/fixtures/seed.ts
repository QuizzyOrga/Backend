import { PrismaClient } from '@prisma/client';
import createRandomAnswer from './answer.seeds';
import createRandomQuestion from './question.seeds';
import createRandomQuiz from './quiz.seeds';
import createRandomUser from './users.seeds';

const prisma = new PrismaClient();
async function main() {
  // for (let i = 0; i <= 10; i++) {
  //   await prisma.user.create({
  //     data: {
  //       ...createRandomUser(),
  //       quiz: {
  //         create: {
  //           createRandomQuiz()
  //           ,
  //         },

  //       },
  //     },
  //   });
  // }
  // // for (let k = 0; k <= 20; k++) {
  // //   await prisma.quiz.create({
  // //     data: {
  // //       ...createRandomQuiz(),
  // //     },
  // //   });
  // // }

  // for (let j = 0; j <= 20; j++) {
  //   await prisma.question.create({
  //     data: {
  //       ...createRandomQuestion(),
  //     },
  //   });
  // }
  // for (let e = 0; e <= 20; e++) {
  //   await prisma.answer.create({
  //     data: {
  //       ...createRandomAnswer(),
  //     },
  //   });
  // }

  // createRandomUser
  // createRandomQuiz()
  // createRandomAnswer()
  // createRandomQuestion()
  // Prisma generate random data
  await prisma.user.createMany({
    data: [...Array(10)].map(() => createRandomUser()),
    skipDuplicates: true,
  });
  await prisma.quiz.createMany({
    data: [...Array(10)].map(() => createRandomQuiz()),
    skipDuplicates: true,
  });

  await prisma.question.createMany({
    data: [...Array(20)].map(() => createRandomQuestion()),
    skipDuplicates: true,
  });

  await prisma.answer.createMany({
    data: [...Array(20)].map(() => createRandomAnswer()),
    skipDuplicates: true,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
