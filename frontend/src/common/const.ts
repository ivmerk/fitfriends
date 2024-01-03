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
  MyFriends = 'myfriends',
  ClientRoom = '/clientroom',
  MyPurchases = 'mypurchases',
  UserList = '/userlist',
  ClientCard = '/clientcard/:id',
  TrainerCard = '/trainercard',
  TrainingsCatalog = '/trainingscatalog',
  TrainingCard = '/trainingcard/:id',
}

export enum APIRoute {
  Login = '/auth/login',
  Logout = '/auth/logout',
  Register = '/auth/register',
  Check = '/auth/check',
  Refresh = '/auth/refresh',
  UpdateUser = '/auth/update',
  User = '/auth/user',
  Training = '/training',
  TrainingCreate = '/training/register',
  TrainindFromTrainer = '/training/bytrainer',
  TrainingFeed = '/training/feed?durations={durations}&priceMin={priceMin}&priceMax={priceMax}&caloriesQttMin={caloriesQttMin}&caloriesQttMax={caloriesQttMax}&ratingMin={ratingMin}&ratingMax={ratingMax}&page={page}&limit={limit}&priceSortType={priceSortType}',
  TrainingsForCatalog = '/training/catalog?typesOfTraining={typesOfTraining}&priceMin={priceMin}&priceMax={priceMax}&caloriesQttMin={caloriesQttMin}&caloriesQttMax={caloriesQttMax}&ratingMin={ratingMin}&ratingMax={ratingMax}&page={page}&limit={limit}&priceSortType={priceSortType}',
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
