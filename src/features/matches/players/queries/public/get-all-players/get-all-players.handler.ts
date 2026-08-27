import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPlayersQuery } from './get-all-players.query';
import { PaginatedResult } from '@/features/common/dtos/paginated-result.dto';
import { ConfigService } from '@nestjs/config';
import { Player } from '@/features/matches/entities/player.entity';
import { plainToInstance } from 'class-transformer';
import { PlayerListDto } from './get-all-players.response';
import { Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@QueryHandler(GetAllPlayersQuery)
export class GetAllPlayersHandler implements IQueryHandler<GetAllPlayersQuery> {
  constructor(
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {
  }

  async execute(query: GetAllPlayersQuery): Promise<PaginatedResult> {
    const take = query.request.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = query.request.page ?? 1;
    const cachedPayload = await this.cache.get<PaginatedResult>(`players:${currentPage}:${take}`);
    if (cachedPayload) {
      return cachedPayload;
    }

    const skip = (currentPage - 1) * take;

    const totalCount = await Player.count();
    const totalPages = Math.ceil(totalCount / take);
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

    const players = await Player.find({ skip: skip, take: take, relations: ['country'], order: { 'id': 'asc' } });
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    for (let player of players) {
      player.country!.flag = baseUrl + '/' + player.country!.flag;
      if (player.image) {
        player.image = baseUrl + '/' + player.image;
      }
    }

    const data = plainToInstance(PlayerListDto, players, { excludeExtraneousValues: true });
    const payload = { totalPages, totalCount, previousPage, currentPage, nextPage, data } as PaginatedResult;
    await this.cache.set(`players:${currentPage}:${take}`, payload); // stale
    return payload;
  }

}