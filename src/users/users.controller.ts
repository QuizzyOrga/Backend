import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthorizerGuard } from '../utils/authorizer/authorizer.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
// @ApiBearerAuth()
// @UseGuards(AuthorizerGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  login(@Body() data: { email: string; password: string }) {
    return this.usersService.login(data.email, data.password);
  }

  @ApiOperation({
    summary: 'Un utilisateur',
  })
  @Get(':id')
  async findOne(@Body() data: { userId: number }, @Param('id') id?: number) {
    const userId: number = id || data.userId;
    return this.usersService.findOne(userId);
  }

  @ApiOperation({ summary: 'Tout les utilisateurs' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  // @Patch()
  // update(@Body() data: { userId: number }, @Body() updateUser: User) {
  //   return this.usersService.update(+data.userId, updateUser);
  // }

  @ApiOperation({ summary: 'Créer un utilisateur' })
  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @ApiOperation({ summary: 'Supprime un utilisateur' })
  @Delete()
  remove(@Body() data: { userId: number }) {
    return this.usersService.remove(+data.userId);
  }
}
