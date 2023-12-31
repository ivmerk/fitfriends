import { Injectable } from '@nestjs/common';
import { FitnessTrainingRepository } from './fitness-training.repository';
import CreateTrainingDto from './dto/create-training.dto';
import { Training } from 'src/types/training.interface';
import { FitnessTrainingEntity } from './fitness-training.entity';
import UpdateTrainingDto from './dto/update-training.dto';
import TrainingFilter from 'src/types/training-filter.interface';
import { TrainingQuery } from './query/training.query';
import { TrainingForCatalogQuery } from './query/training-for-catalog.query';

@Injectable()
export default class FitnessTrainingService {
  constructor(
    private readonly fitnessTrainingRepository: FitnessTrainingRepository,
  ) {}

  public async createTraining(dto: CreateTrainingDto): Promise<Training> {
    const fitnessTrainig = { ...dto, feedBacks: [] };
    const trainingEntity = new FitnessTrainingEntity(fitnessTrainig);

    return await this.fitnessTrainingRepository.create(trainingEntity);
  }

  public async updateTraining(trainingId: number, dto: UpdateTrainingDto) {
    const oldTraining = await this.fitnessTrainingRepository.findById(
      trainingId,
    );
    if (oldTraining) {
      const trainingEntity = new FitnessTrainingEntity({
        ...oldTraining,
        ...dto,
      });

      return await this.fitnessTrainingRepository.update(
        trainingId,
        trainingEntity,
      );
    }
  }

  public async getTraining(trainingId: number) {
    return await this.fitnessTrainingRepository.findById(trainingId);
  }

  public async getTrainings(query: TrainingQuery, trainerId: number) {
    const filter: TrainingFilter = { ...query };
    return await this.fitnessTrainingRepository.find(filter, trainerId);
  }

  public async getTrainingsForCatalog(query: TrainingForCatalogQuery) {
    return await this.fitnessTrainingRepository.findForCatalog(query);
  }

  public async getTrainingsFromTrainer(trainerId: number) {
    return await this.fitnessTrainingRepository.findFromTrainer(trainerId);
  }
}
