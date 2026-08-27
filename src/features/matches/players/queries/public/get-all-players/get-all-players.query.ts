import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '@/features/common/dtos/paginated-result.dto';
import { GetAllPlayersRequest } from '@/features/matches/players/queries/public/get-all-players/get-all-players.request';

export class GetAllPlayersQuery extends Query<PaginatedResult> {
  constructor(public readonly request: GetAllPlayersRequest) {
    super();
  }
}