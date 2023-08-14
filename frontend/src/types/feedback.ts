export type Feedback = {
  feedbackId?: number;
  userId: number;
  trainingId: number;
  rating: number;
  text: string;
  createdAt?: Date;
};
