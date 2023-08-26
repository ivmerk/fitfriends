import { AuthorizationStatus } from '../common/const';
import { store } from '../store';
import { PersonalOrderTraining } from './personal-order-training';
import { Training } from './training';
import { TrainingOrderFeed } from './training-order-feed';
import { User, UserFormRegister } from './user';
import { UserRole } from './user-role.enum';

export interface UserData {
  authorizationStatus: AuthorizationStatus;
  users: User[];
  loggedUserId: number | null;
  isLoadingComplete: boolean;
  isLogingComplete: boolean;
  isDeletingComplete: boolean;
  hasError: boolean;
  loggedUserRole: UserRole | null;
  loggedUser: User | null;
  userAvatar: string;
  userSertificate: string;
  userFriends: User[];
  personalTrainingOrders: PersonalOrderTraining[];
  userList: User[];
  user: User | null;
}

export interface UserProcess {
  isEdit: boolean;
  registringUser: UserFormRegister | null;
  listPageNumber: number;
  listLimit: number;
  listSortingAscType: boolean;
}

export interface TrainingData {
  trainerTrainingList: Training[];
  isLoadingComplete: boolean;
  trainerOrderedTrainingList: TrainingOrderFeed[];
  recomendatedTrainingList: Training[];
}
export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
