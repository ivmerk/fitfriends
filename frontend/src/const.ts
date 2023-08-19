export enum AppRoute {
  Main = '/',
  Intro = '/intro',
  SingUp = '/login',
  Registration = '/registration',
  TrainerRoom = '/trainerroom',
  Info = 'info',
  NewTraining = 'newtraining',
  MyTrainings = 'mytrainings',
  MyOrdersTrainer = 'myorderstrainer',
  MyFriendsTrainer = 'myfriendstrainer',
  ClientRoom = '/clientroom',
  MyOrdersUser = 'myorderuser',
  MeFriendsUser = 'myfriendsuser',
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
  TrainingFeed = '/training/feed?durations={durations}&priceMin={priceMin}&priceMax={priceMax}&caloriesQttMin={caloriesQttMin}&caloriesQttMax={caloriesQttMax}&ratingMin={ratingMin}&ratingMax={ratingMax}&page={page}&limit={limit}&priceSortType={priceSortType}',
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
