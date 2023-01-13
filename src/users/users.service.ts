import { Injectable, Logger } from '@nestjs/common';
import { FriendshipStatus, PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(UsersService.name);

  async create(createUser: CreateUserDto) {
    const user: User = await this.prisma.user.create({
      data: {
        firstname: createUser.firstname,
        lastname: createUser.lastname,
        email: createUser.email,
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany({ take: 100 });
    return users;
  }

  async findOne(id: number): Promise<User> {
    // Get user by id and mutual friend count
    const user: User = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      // Include mutual friends count, if fromFriendship is status accepted
    });

    return user;
  }

  async findFriendsMany(userId: number, search: string, count = false) {
    const user: User[] = await this.prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            OR: [
              {
                fromFriendship: {
                  some: {
                    toId: userId,
                    status: FriendshipStatus.ACCEPTED,
                  },
                },
              },
              {
                toFrienship: {
                  some: {
                    fromId: userId,
                    status: FriendshipStatus.ACCEPTED,
                  },
                },
              },
            ],
          },
        ],
      },
    });
    if (search) {
      search = search.toLowerCase();
      return user.filter(
        (user) =>
          user.firstname.toLowerCase().includes(search) ||
          user.lastname.toLowerCase().includes(search),
      );
    }
    return count ? user.length : user;
  }

  update(id: number, updateUser: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createBlocked(userId: number, userBlockedId: number) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        blockedUsers: {
          connect: { id: userBlockedId },
        },
      },
    });

    return true;
  }

  async removeBlockedUserByUser(userId: number, userBlockedId: number) {
    // Delete blocked user in blockedByUsers
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        blockedUsers: { disconnect: { id: userBlockedId } },
      },
    });
    return true;
  }

  async findAllBlockedByUser(userId: number) {
    const users: { blockedUsers: User[] } =
      await this.prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        select: {
          blockedUsers: true,
        },
      });
    return users;
  }

  async findLastSubscriptions(userId: number): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      where: {
        NOT: {
          id: userId,
        },
      },
      take: 100,
    });
    return users;
  }

  async findLikesMany(userId: number, sort: any) {
    /*
    return await this.prisma.postLike.findMany({
      orderBy: [
        {
          createdAt: sort,
        },
      ],
      where: {
        userId: userId,
      },
      include: {
        post: {
          select: {
            createdAt: true,
            htmlContent: true,
            postAttachments: {
              select: {
                s3Key: true,
                type: true,
              },
            },
            user: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
          },
        },
      },
    });
*/
    return await this.prisma.postLike.findMany({
      orderBy: [
        {
          createdAt: sort,
        },
      ],
      where: {
        userId: userId,
      },
      include: {
        post: {
          include: {
            user: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
            _count: {
              select: {
                postComments: true,
                postLikes: true,
                postAttachments: true,
              },
            },
          },
        },
      },
    });
  }

  async findCommentsMany(userId: number, sort: any) {
    return await this.prisma.postComment.findMany({
      orderBy: [
        {
          createdAt: sort,
        },
      ],
      where: {
        userId: userId,
      },
      include: {
        post: {
          include: {
            user: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
            _count: {
              select: {
                postComments: true,
                postLikes: true,
                postAttachments: true,
              },
            },
          },
        },
      },
    });
  }

  async findAllRecommandedFriend(userId: number) {
    // Retourne les utilisateurs qui ne sont pas amis avec l'utilisateur connecté, mais amis avec ses amis
    const user = await this.prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              OR: [
                {
                  fromFriendship: {
                    some: {
                      toId: userId,
                      status: FriendshipStatus.ACCEPTED,
                    },
                  },
                },
                {
                  toFrienship: {
                    some: {
                      fromId: userId,
                      status: FriendshipStatus.ACCEPTED,
                    },
                  },
                },
              ],
            },
          },
          {
            OR: [
              {
                fromFriendship: {
                  some: {
                    to: {
                      fromFriendship: {
                        some: {
                          toId: userId,
                          status: FriendshipStatus.ACCEPTED,
                        },
                      },
                    },
                  },
                },
              },
              {
                toFrienship: {
                  some: {
                    from: {
                      fromFriendship: {
                        some: {
                          toId: userId,
                          status: FriendshipStatus.ACCEPTED,
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    });
    return user;
  }
}
