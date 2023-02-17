import { Module } from '@nestjs/common';
import { RechercheService } from './recherche.service';
import { RechercheController } from './recherche.controller';

@Module({
  controllers: [RechercheController],
  providers: [RechercheService],
})
export class RechercheModule {}