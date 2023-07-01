import { Entity } from '../../../types/entity.interface';
import { OrderTraining } from '../../../types/order-training.interface';
import { PersonalOrderTraining } from '../../../types/personal-order-training.interface';
import { UserBalance } from '../../../types/user-balance.interface';
import { UserRoleType } from '../../../types/user-role.enum';
import { TrainerBody, User, ClientBody } from '../../../types/user.interface';

export class FitnessUserEntity implements Entity<FitnessUserEntity>, User {
  public userId!: number;
  public userName!: string;
  public userMail!: string;
  public userAvatar?: string;
  public passwordHash!: string;
  public userGender!: string;
  public birthDate!: string;
  public userRole!: UserRoleType;
  public description!: string;
  public location!: string;
  public backgraundPicture!: string;
  public createdAt!: Date;
  public clientBody?: ClientBody | null;
  public trainerBody?: TrainerBody | null;
  public levelOfExperience!: string;
  public typesOfTraning!: string[];
  public orders!: OrderTraining[];
  public personalOrders!: PersonalOrderTraining[];
  public userBalance!: UserBalance[];
  public friends!: number[];

  constructor(fitnessUser: User) {
    this.fillEntity(fitnessUser);
  }

  public fillEntity(entity: User): void {
    this.userName = entity.userName;
    this.userMail = entity.userMail;
    this.userAvatar = entity.userAvatar;
    this.passwordHash = entity.passwordHash;
    this.userGender = entity.userGender;
    this.birthDate = entity.birthDate;
    this.userRole = entity.userRole;
    this.description = entity.description;
    this.location = entity.location;
    this.backgraundPicture = entity.backgraundPicture;
    this.createdAt = new Date();
    this.clientBody = entity.clientBody;
    this.trainerBody = entity.trainerBody;
    this.levelOfExperience = entity.levelOfExperience;
    this.typesOfTraning = entity.typesOfTraning;
    this.orders = [];
    this.personalOrders = [];
    this.userBalance = [];
    this.friends = [];
  }

  public toObject(): FitnessUserEntity {
    return { ...this };
  }
}
