import { faker } from '@faker-js/faker';
import { Quiz } from '@prisma/client';

export const usersId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const createRandomQuiz = () => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    creatorId: faker.helpers.arrayElement(usersId),
    title: faker.lorem.sentence(3),
    isPublic: true,
    isDeleted: false,
  };
};

export default createRandomQuiz;
