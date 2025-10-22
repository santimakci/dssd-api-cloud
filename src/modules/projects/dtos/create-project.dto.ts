import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Proyecto de Energía Solar' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ONG Solar para Todos' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  ongName: string;

  @ApiProperty({ example: 'contact@ongsolar.org' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  ongMail: string;

  @ApiProperty({
    example: 'Instalación de paneles solares en comunidades rurales',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Argentina' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: '2023-01-01' })
  @Expose()
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2023-12-31' })
  @Expose()
  @IsDateString()
  endDate: Date;
}
