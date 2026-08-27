import { Controller, Get, Query } from '@nestjs/common';
import { GetAllPlayersRequest } from './queries/public/get-all-players/get-all-players.request';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginatedResultDto } from '@/features/common/dtos/paginated-result.dto';
import { PlayerListDto } from './queries/public/get-all-players/get-all-players.response';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllPlayersQuery } from '@/features/matches/players/queries/public/get-all-players/get-all-players.query';

@Controller('public/players')
export class PlayersPublicController {
  constructor(private readonly queryBus: QueryBus) {
  }

  @Get('get-all-players')
  @ApiOkResponse({ type: PaginatedResultDto(PlayerListDto) })
  async getAllPlayers(@Query() filters: GetAllPlayersRequest) {
    const query = new GetAllPlayersQuery(filters);
    return await this.queryBus.execute(query);
  }
}