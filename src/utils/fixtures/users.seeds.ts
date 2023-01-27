import { faker } from '@faker-js/faker';
import { Role, User } from '@prisma/client';

export const usersId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const createRandomUser = () => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Role.USER,
  } as User;
};

export default createRandomUser;
