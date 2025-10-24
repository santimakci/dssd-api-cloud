import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateTaskDto {
  @ApiProperty({
    example: 'b4d968b6-333b-4c8c-a93d-8b1f39332ed7',
    description: 'ID del proyecto tipo UUID',
  })
  @Expose()
  projectId: string;

  @ApiProperty({ example: 'Conseguir paneles solares' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Instalar paneles solares en el techo del edificio' })
  @Expose()
  description: string;

  @ApiProperty({ example: '2024-12-31', type: String, format: 'date' })
  @Expose()
  startDate: Date;

  @ApiProperty({ example: '2025-06-30', type: String, format: 'date' })
  @Expose()
  endDate: Date;
}
