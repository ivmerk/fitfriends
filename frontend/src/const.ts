export enum AppRoute {
  Main = '/',
  Intro = '/intro',
  SingUp = '/login',
  Registration = '/registration',
  TrainerRoom = '/trainerroom',
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
