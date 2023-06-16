import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  modal: string;

  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  @Min(2000)
  @Max(2025)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty()
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
