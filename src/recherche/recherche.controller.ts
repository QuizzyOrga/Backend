import { Controller, Get, Query } from '@nestjs/common';
import { RechercheService } from './recherche.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('recherche')
@Controller('recherche')
@SkipThrottle()
export class RechercheController {
  constructor(private readonly rechercheService: RechercheService) {}

  @ApiOperation({ summary: 'Chercher un quizz' })
  @Get()
  findAll(@Query('term') term: string) {
    return this.rechercheService.recherche(term);
  }
}
