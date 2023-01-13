import { PrismaClient } from '@prisma/client';
import createRandomUser from './users.seeds';

const prisma = new PrismaClient();
async function main() {
  const fakerRounds = 10;
  for (let i = 0; i <= fakerRounds; i++) {
    await prisma.user.create({
      data: {
        ...createRandomUser(),
      },
    });
  }
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
