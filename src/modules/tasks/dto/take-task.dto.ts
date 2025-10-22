import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TakeTaskDto {
  @ApiProperty({
    example: 'Unicef Argentina',
    description: 'Nombre de la organización o colaborador',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'unicef@admin.com',
    description: 'Email de la organización o colaborador',
  })
  @Expose()
  email: string;
}
