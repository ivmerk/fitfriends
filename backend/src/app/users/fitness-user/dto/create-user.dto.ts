import { UserRoleType } from '../../../../types/user-role.enum';
import {
  ClientBody,
  TrainerBody,
  User,
} from '../../../../types/user.interface';

class ClientBodyDto implements ClientBody {
  public timeOfTraining!: string;
  public caloryLosingPlanTotal!: number;
  public caloryLosingPlanDaily!: number;
  public readinessForTraining!: boolean;
}
class TrainerBodyDto implements TrainerBody {
  public sertificate!: string;
  public merit!: string;
  public readinessForPrivate!: boolean;
}

export class CreateUserDto implements User {
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
  public clientBody?: ClientBodyDto;
  public trainerBody?: TrainerBodyDto;
  public levelOfExperience!: string;
  public typesOfTraning!: string[];
  public friends!: number[];
}
