import { ApiProperty } from '@nestjs/swagger';
import { QueryPaginationBaseDto } from './query-pagination-base.dto';

export class QueryPaginationDto extends QueryPaginationBaseDto {
  @ApiProperty({
    description: 'Project ID to filter tasks (Optional)',
  })
  projectId: string;
}
