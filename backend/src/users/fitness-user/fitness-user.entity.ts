import { compare, genSalt, hash } from 'bcrypt';
import { Entity } from '../../types/entity.interface';
import { OrderTraining } from '../../types/order-training.interface';
import { PersonalOrderTraining } from '../../types/personal-order-training.interface';
import { UserBalance } from '../../types/user-balance.interface';
import { UserRoleType } from '../../types/user-role.enum';
import { TrainerBody, User, ClientBody } from '../../types/user.interface';
import { SALT_ROUNDS } from '../../common/constant.js';
import { UserFriend } from 'src/types/user-friend';

export class FitnessUserEntity implements Entity<FitnessUserEntity>, User {
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
  public typesOfTraining!: string[];
  public orders!: OrderTraining[];
  public personalOrders!: PersonalOrderTraining[];
  public userBalance!: UserBalance[];
  public friends!: UserFriend[];

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
    this.typesOfTraining = entity.typesOfTraining;
    this.orders = [];
    this.personalOrders = [];
    this.userBalance = [];
    this.friends = [];
  }

  public toObject(): FitnessUserEntity {
    return { ...this };
  }
  public async setPassword(password: string): Promise<FitnessUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
