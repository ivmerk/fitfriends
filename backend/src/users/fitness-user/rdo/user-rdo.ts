import { Expose } from 'class-transformer';
import { OrderTraining } from '../../../types/order-training.interface';
import { PersonalOrderTraining } from '../../../types/personal-order-training.interface';
import { UserBalance } from '../../../types/user-balance.interface';
import { UserRoleType } from '../../../types/user-role.enum';
import { ClientBody, TrainerBody } from '../../../types/user.interface';

export class UserRdo {
  @Expose()
  public userId!: number;
  @Expose()
  public userName!: string;
  @Expose()
  public userMail!: string;
  @Expose()
  public userAvatar?: string;
  @Expose()
  public userGender!: string;
  @Expose()
  public birthDate!: string;
  @Expose()
  public userRole!: UserRoleType;
  @Expose()
  public description!: string;
  @Expose()
  public location!: string;
  @Expose()
  public backgraundPicture!: string;
  @Expose()
  public createdAt!: Date;
  @Expose()
  public clientBody?: {
    clientBodyId?: number;
    timeOfTraining?: string;
    caloryLosingPlanTotal?: number;
    caloryLosingPlanDaily?: number;
    readinessForTraining?: boolean;
  };
  @Expose()
  public trainerBody?: {
    trainerBodyId?: number;
    sertificates?: string[];
    merit?: string;
    readinessForPrivate?: boolean;
  };
  @Expose()
  public levelOfExperience!: string;
  @Expose()
  public typesOfTraining!: string[];
  @Expose()
  public orders?: OrderTraining[];
  @Expose()
  public personalOrders?: PersonalOrderTraining[];
  @Expose()
  public userBalance?: UserBalance[];
  @Expose()
  public sertificates?: string[];
}
