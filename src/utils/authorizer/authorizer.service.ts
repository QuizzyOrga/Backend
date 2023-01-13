import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import AWS from 'aws-sdk';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

import { Logger, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthorizerService {
  private readonly logger = new Logger(AuthorizerService.name);
  prisma = new PrismaClient();

  async validateAccessToken(token: string): Promise<void> {
    try {
      const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.UserPoolId,
        clientId: process.env.ClientId,
        tokenUse: 'access',
      });
      await verifier.verify(token);
    } catch (error) {
      this.logger.debug(`Token not valid! Because: ${error.message}`);
      throw new UnauthorizedException('Token not valid!');
    }
  }

  async getEmailUserInfo(token: string): Promise<string> {
    const cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider({
        region: process.env.Region,
      });

    return new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.getUser(
        {
          AccessToken: token,
        },
        (err, data) => {
          if (err) {
            this.logger.error(err);
            reject(err);
          } else {
            const email = data.UserAttributes.find(
              (attr) => attr.Name === 'email',
            ).Value;
            resolve(email);
          }
        },
      );
    });
  }

  async findUseridByEmail(email: string) {
    return await this.prisma.user.findUniqueOrThrow({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });
  }
}
