import { Injectable } from '@nestjs/common';
import { CRUDRepository } from 'src/types/crud-repository';
import { PersonalOrderTrainingEntity } from './personal-order-training.entity';
import { PersonalOrderTraining } from 'src/types/personal-order-training.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersonalOrderTrainingRepository
  implements
    CRUDRepository<PersonalOrderTrainingEntity, number, PersonalOrderTraining>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    personalOrderTrainingEntity: PersonalOrderTrainingEntity,
  ): Promise<PersonalOrderTraining> {
    const entity = personalOrderTrainingEntity.toObject();
    return await this.prisma.personalOrderTraining.create({
      data: { ...entity },
    });
  }

  public async destroy(personalOrderTrainingId: number): Promise<void> {
    await this.prisma.personalOrderTraining.delete({
      where: {
        personalOrderTrainingId,
      },
    });
  }

  public async findById(
    personalOrderTrainingId: number,
  ): Promise<PersonalOrderTraining> {
    return await this.prisma.personalOrderTraining.findFirst({
      where: { personalOrderTrainingId },
    });
  }

  public async update(
    personalOrderTrainingId: number,
    personalOrderTrainingEntity: PersonalOrderTrainingEntity,
  ): Promise<PersonalOrderTraining> {
    const entity = personalOrderTrainingEntity.toObject();
    return await this.prisma.personalOrderTraining.update({
      where: { personalOrderTrainingId },
      data: { ...entity },
    });
  }
}
