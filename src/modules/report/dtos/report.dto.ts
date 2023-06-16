import { Expose, Transform } from 'class-transformer';
import { User } from '../../user/entities/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  approved: boolean;

  @Expose()
  make: string;

  @Expose()
  modal: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;
  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
