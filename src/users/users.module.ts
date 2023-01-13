import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthorizerModule } from '../utils/authorizer/authorizer.module';

@Module({
  imports: [AuthorizerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
