import { faker } from '@faker-js/faker';
import { Answer, Question } from '@prisma/client';

export const questionId = [1, 2, 3, 4, 5, 6];
const createRandomAnswer = () => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    title: faker.lorem.sentence(3),
    questionId: Number(faker.helpers.arrayElement(questionId)),
  } as Answer;
};

export default createRandomAnswer;
