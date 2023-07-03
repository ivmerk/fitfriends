import { Expose } from 'class-transformer';
import { OrderTraining } from '../../../../types/order-training.interface';
import { PersonalOrderTraining } from '../../../../types/personal-order-training.interface';
import { UserBalance } from '../../../../types/user-balance.interface';
import { UserRoleType } from '../../../../types/user-role.enum';
import { ClientBody, TrainerBody } from '../../../../types/user.interface';

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
  public passwordHash!: string;
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
  public clientBody?: ClientBody;
  @Expose()
  public trainerBody?: TrainerBody;
  @Expose()
  public levelOfExperience!: string;
  @Expose()
  public typesOfTraning!: string[];
  @Expose()
  public orders?: OrderTraining[];
  @Expose()
  public personalOrders?: PersonalOrderTraining[];
  @Expose()
  public userBalance?: UserBalance[];
  @Expose()
  public friends?: number[];
}
