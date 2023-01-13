import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaClient, User } from '@prisma/client';
import { AuthorizerGuard } from '../utils/authorizer/authorizer.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthorizerGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Listes des 100 derniers inscrits',
    description: "à l'exception de l'utilisateur actuel",
  })
  @Get('lastSubscriptions')
  findLastSubscriptions(@Body() data: { userId: number }) {
    return this.usersService.findLastSubscriptions(+data.userId);
  }

  // @ApiOperation({ summary: 'Tout les utilisateurs' })
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @Patch()
  update(@Body() data: { userId: number }, @Body() updateUser: User) {
    return this.usersService.update(+data.userId, updateUser);
  }

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

  @ApiOperation({ summary: "Tout les utilisateurs bloqué par l'utilisateur" })
  @Get('blockeds')
  async findAllBlockedByUser(@Body() data: { userId: number }) {
    return this.usersService.findAllBlockedByUser(+data.userId);
  }

  @ApiOperation({ summary: 'Bloque un utilisateur' })
  @Post('blockeds/:userBlockedId')
  createBlocked(
    @Body() data: { userId: number },
    @Param('userBlockedId') userBlockedId: string,
  ) {
    return this.usersService.createBlocked(+data.userId, +userBlockedId);
  }

  @ApiOperation({ summary: "Supprimer le blocage d'un utilisateur" })
  @Delete('blockeds/:userBlockedId')
  removeBlocked(
    @Body() data: { userId: number },
    @Param('userBlockedId') userBlockedId: string,
  ) {
    return this.usersService.removeBlockedUserByUser(
      +data.userId,
      +userBlockedId,
    );
  }

  @ApiOperation({ summary: "Les recommandations d'amis" })
  @Get('recommended')
  async findAllRecommandedFriend(@Body() data: { userId: number }) {
    return this.usersService.findAllRecommandedFriend(+data.userId);
  }

  @ApiOperation({
    summary: "Récupère tous les likes de l'utilisateur",
    description:
      "Soit par le paramètre 'userId' soit par le body data 'userId'",
  })
  @ApiParam({
    name: 'id',
    description: "L'id de l'utilisateur",
    required: false,
    type: Number,
  })
  @Get(':id?/likes')
  findLikesMany(
    @Body() data: { userId: number },
    @Param('id') id?: number,
    @Query('sort') sort: any = 'asc',
  ) {
    const userId = id || data.userId;
    return this.usersService.findLikesMany(userId, sort);
  }

  @ApiOperation({
    summary: "Toutes les amis de l'utilisateur",
    description: 'Recherche possible avec le param ?search=jack ou count=true',
  })
  @ApiParam({
    name: 'id',
    description: "L'id de l'utilisateur",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Recherche par nom ou prénom',
    type: String,
  })
  @ApiQuery({
    name: 'count',
    required: false,
    description: "Retourne le nombre d'amis",
    type: Boolean,
  })
  @Get(':id?/friends')
  findFriendByUser(
    @Body() data: { userId: number },
    @Param('id') id?: number,
    @Query('search') search?: string,
    @Query('count') count?: boolean,
  ) {
    const userId = id || data.userId;
    return this.usersService.findFriendsMany(userId, search, count);
  }

  @ApiOperation({
    summary: "Récupère tous les commentaires de l'utilisateur",
    description: "Soit par le paramètre 'id' soit par le body data 'userId'",
  })
  @ApiParam({
    name: 'id',
    description: "L'id de l'utilisateur",
    required: false,
    type: Number,
  })
  @Get(':id?/comments')
  findCommentsMany(
    @Body() data: { userId: number },
    @Param('id') id?: number,
    @Query('sort') sort: any = 'asc',
  ) {
    const userId = id || data.userId;
    return this.usersService.findCommentsMany(userId, sort);
  }

  @ApiOperation({
    summary: "Profil d'un utilisateur",
    description: "Soit par le paramètre 'id' soit par le body 'userId'",
  })
  @ApiParam({
    name: 'id',
    description: "L'id de l'utilisateur",
    required: false,
    type: Number,
  })
  @Get(':id?/user')
  async findOne(@Body() data: { userId: number }, @Param('id') id?: number) {
    const userId: number = id || data.userId;
    return this.usersService.findOne(userId);
  }
}
