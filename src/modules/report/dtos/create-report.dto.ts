import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  modal: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(2000)
  @Max(2025)
  year: number;

  @IsNotEmpty()
  @IsLongitude()
  lng: number;

  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
