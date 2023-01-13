import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthorizerGuard } from './utils/authorizer/authorizer.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Vérifie AuthorizerGuard le token' })
  @ApiBearerAuth()
  @UseGuards(AuthorizerGuard)
  @Get('testAuth')
  async getTest(
    @Body() data: { userId: number },
    @Req() request,
  ): Promise<string> {
    return this.appService.getAuth(+data.userId, request.headers.authorization);
  }

  @ApiOperation({
    summary: "Nombre total d'utilisateurs inscrit",
  })
  @Get('globalUsersCount')
  globalUsersCount() {
    return this.appService.globalUsersCount();
  }
}
