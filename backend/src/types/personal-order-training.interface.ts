export interface PersonalOrderTraining {
  personalOrderTrainingId?: number;
  userId: number;
  trainerId: number;
  createdAt?: Date;
  updateAt?: Date;
  orderCondition: string;
}
