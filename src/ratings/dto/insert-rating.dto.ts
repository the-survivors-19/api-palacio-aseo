import { CreateRatingDto } from "./create-rating.dto";

export class InsertRatingDto extends CreateRatingDto {
  email_user: string;
}