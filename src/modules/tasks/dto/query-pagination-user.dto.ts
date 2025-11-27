import { ApiProperty } from '@nestjs/swagger';
import { QueryPaginationBaseDto } from 'src/common/dtos/pagination/query-pagination-base.dto';

export class QueryPaginationUserDto extends QueryPaginationBaseDto {
  @ApiProperty({
    description: 'Project ID to filter tasks (Optional)',
  })
  email?: string;
}
