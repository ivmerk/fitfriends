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
  UserList = '/userlist',
  ClientCard = '/clientcard/:id',
  TrainerCard = '/trainercard',
  TrainingsList = '/trainingslist',
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
  TrainindFromTrainer = '/training/bytrainer',
  TrainingFeed = '/training/feed?durations={durations}&priceMin={priceMin}&priceMax={priceMax}&caloriesQttMin={caloriesQttMin}&caloriesQttMax={caloriesQttMax}&ratingMin={ratingMin}&ratingMax={ratingMax}&page={page}&limit={limit}&priceSortType={priceSortType}',
  UploadImg = '/files/upload/img',
  UploadPdf = '/files/upload/pdf',
  UploadVideo = '/files/upload/video',
  UserFriends = '/user/friend',
  MyUserFriendsCards = '/user/myfriendcards',
  UserPersonalOrder = '/user/personalorder',
  PersonalOrderAprooving = '/user/personalorder?orderId={orderId}&newStatus={newStatus}',
  ListOfTraining = '/user/traininglist?trainingQttSortingType={trainingQttSortingType}&totalMoneySortingType={totalMoneySortingType}',
  TrainingRecomendations = '/user/recomendations',
  UsersList = '/auth/feed?limit={limit}&page={page}&levelOfExperience={levelOfExperience}&locations={locations}&typesOfTraining={typesOfTraining}',
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
