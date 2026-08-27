import { Module } from '@nestjs/common';
import { GetAllPlayersHandler } from '@/features/matches/players/queries/public/get-all-players/get-all-players.handler';
import { PlayersPublicController } from '@/features/matches/players/players.public.controller';

@Module({
  controllers: [PlayersPublicController],
  providers: [GetAllPlayersHandler],
})
export class MatchesModule {
}