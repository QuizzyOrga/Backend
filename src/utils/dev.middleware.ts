import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

// Token global for development
// La première fois que l'on lance l'application, on récupère le token sinon on utilise le token global
global.token = '';

@Injectable()
export class DevMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization && !global.token) {
      // Get user credentials from environment variables
      const username = process.env.UserEmail;
      const password = process.env.UserPassword;
      const userId = process.env.UserId;

      // Get user pool configuration from environment variables
      const UserPoolId = process.env.UserPoolId;
      const ClientId = process.env.ClientId;

      const userPool = new CognitoUserPool({ UserPoolId, ClientId });
      const user = new CognitoUser({ Username: username, Pool: userPool });
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          req.headers.authorization = `Bearer ${result
            .getAccessToken()
            .getJwtToken()}`;
          global.token = req.headers.authorization;
          req.body['userId'] = userId;
          next();
        },
        onFailure: (error) => {
          // Return error response
          res.status(401).send({ message: error.message });
        },
      });
    } else {
      if (!req.headers.authorization && global.token) {
        req.headers.authorization = global.token;
        req.body['userId'] = process.env.UserId;
      }
      next();
    }
  }
}
