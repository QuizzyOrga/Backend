import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export const usersId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const createRandomUser = () => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    avatarS3Key: faker.datatype.string(),
    coverPicS3Key: faker.datatype.string(),
    config: faker.datatype.json(),
  };
};

export default createRandomUser;
