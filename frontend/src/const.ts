export enum AppRoute {
  Main = '/',
  Intro = '/intro',
  SingUp = '/login',
  Registration = '/registration',
  TrainerRoom = '/trainerroom',
  Info = 'info',
  NewTraining = '/newtraining',
  ClientRoom = '/clientroom',
  ClientsList = '/clientlist',
  ClientCard = '/clientcard',
  TrainerCard = '/trainercard',
  TrainingsLis = '/trainingslist',
  TrainingCard = '/trainingcard',
}

export enum APIRoute {
  Login = '/auth/login',
  Logout = '/logout',
  Register = '/auth/register',
  UpdateUser = '/auth/update',
  User = '/auth/user',
  Training = '/training',
  TrainingCreate = '/training/register',
  UploadImg = '/files/upload/img',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  Training = 'TRAINING',
}
