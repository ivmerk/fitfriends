import { Entity } from 'src/types/entity.interface';
import { Feedback } from 'src/types/feedback.interface';
import { Training } from 'src/types/training.interface';

export class FitnessTrainingEntity
  implements Entity<FitnessTrainingEntity>, Training
{
  public title: string;
  public backgroundPicture?: string;
  public levelOfUser: string;
  public typeOfTraining: string;
  public duration: string;
  public price: number;
  public caloriesQtt: number;
  public description: string;
  public trainingGender: string;
  public video: string;
  public rating?: number;
  public trainerId: number;
  public isPromo?: boolean;
  public feedbacks?: Feedback[];

  constructor(fitnessTraining: Training) {
    this.fillEntity(fitnessTraining);
  }

  public fillEntity(entity: Training): void {
    this.title = entity.title;
    this.backgroundPicture = entity.backgroundPicture;
    this.levelOfUser = entity.levelOfUser;
    this.typeOfTraining = entity.typeOfTraining;
    this.duration = entity.duration;
    this.price = entity.price;
    this.caloriesQtt = entity.caloriesQtt;
    this.description = entity.description;
    this.trainingGender = entity.trainingGender;
    this.video = entity.video;
    this.rating = entity.rating;
    this.trainerId = entity.trainerId;
    this.isPromo = entity.isPromo;
    this.feedbacks = [];
  }

  public toObject(): FitnessTrainingEntity {
    return { ...this };
  }
}
