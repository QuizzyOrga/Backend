import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthorizerService } from './authorizer.service';
@Injectable()
export class AuthorizerGuard implements CanActivate {
  constructor(private readonly authorizerService: AuthorizerService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.headers['authorization'];
      if (!authHeader) {
        throw new UnauthorizedException(`Authorization header is required`);
      }
      const tokenArray = authHeader.split(' ', 2);
      if (!tokenArray[0] || tokenArray[0].toLowerCase() !== 'bearer') {
        throw new UnauthorizedException('Token type must be Bearer');
      }
      await this.authorizerService.validateAccessToken(tokenArray[1]);
      const emailUser = await this.authorizerService.getEmailUserInfo(
        tokenArray[1],
      );
      const data = await this.authorizerService.findUseridByEmail(emailUser);
      request.body['userId'] = data.id;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
