import { Expose } from 'class-transformer';
import { Feedback } from 'src/types/feedback.interface';

export class TrainingRdo {
  @Expose()
  public trainingId?: number;
  @Expose()
  public title: string;
  @Expose()
  public backgroundPicture: string;
  @Expose()
  public levelOfUser: string;
  @Expose()
  public typeOfTraining: string;
  @Expose()
  public duration: string;
  @Expose()
  public price: number;
  @Expose()
  public caloriesQtt: number;
  @Expose()
  public description: string;
  @Expose()
  public trainingGender: string;
  @Expose()
  public video: string;
  @Expose()
  public rating: number;
  @Expose()
  public trainerId: number;
  @Expose()
  public isPromo: boolean;
  @Expose()
  public feedbacks?: Feedback[];
}
