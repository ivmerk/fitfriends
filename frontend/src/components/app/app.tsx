import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute} from '../../common/const';
import MainScreen from '../../pages/main-screen/main-screen';
import SignUpScreen from '../../pages/sign-up-screen/sign-up-screen';
import RegistrationScreen from '../../pages/registration-screen/registration-screen';
import TrainerRoomScreen from '../../pages/trainer-room-screen/trainer-room-screen';
import IntroScreen from '../../pages/intro-screen/intro-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import NewTrainingForm from '../new-training-form/new-training-form';
import TrainersInfo from '../trainer-info/trainer-info';
import MyTrainingListBlock from '../my-training-list-block/my-training-list-block';
import MyFriendsTrainerroom from '../my-friends-trainerroom/my-friends-traineroom';
import MyOrdersTrainerroom from '../my-orders-trainerroom/my-orders-trainerroom';
import { HelmetProvider } from 'react-helmet-async';
import UserListScreen from '../../pages/user-list-screen/user-list-screen';
import ClientCardScreen from '../../pages/client-card-screen/client-card-screen';
import TrainerCardScreen from '../../pages/trainer-card-screen/trainer-card-screen';
import TrainingsListScreen from '../../pages/training-list-screen/training-list-screen';
import TrainingCardScreen from '../../pages/training-card-screen/training-card-screen';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return(
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Intro} element={<IntroScreen/>}/>
          <Route path={AppRoute.Main} element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <MainScreen/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.SingUp} element={<SignUpScreen/>}/>
          <Route path={AppRoute.Registration} element={<RegistrationScreen/>}/>
          <Route path={AppRoute.TrainerRoom} element={
            <TrainerRoomScreen/>
          }
          >
            <Route path={AppRoute.Info} element={
              <PrivateRoute
                authorizationStatus = {authorizationStatus}
              >
                <TrainersInfo/>

              </PrivateRoute>
            }
            />
            <Route path={AppRoute.NewTraining} element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <NewTrainingForm/>
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.MyTrainings} element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <MyTrainingListBlock/>
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.MyFriendsTrainer} element={
              <PrivateRoute
                authorizationStatus = {authorizationStatus}
              >
                <MyFriendsTrainerroom/>

              </PrivateRoute>
            }
            />
            <Route path={AppRoute.MyOrdersTrainer} element={
              <PrivateRoute
                authorizationStatus = {authorizationStatus}
              >
                <MyOrdersTrainerroom/>

              </PrivateRoute>
            }
            />
            <Route path='*' element={<h1>Страница не найдена</h1>}/>
          </Route>
          <Route path={AppRoute.UserList} element={<UserListScreen/>}/>
          <Route path={AppRoute.ClientCard} element={<ClientCardScreen/>}/>
          <Route path={AppRoute.TrainerCard} element={<TrainerCardScreen/>}/>
          <Route path={AppRoute.TrainingsList} element={<TrainingsListScreen/>}/>
          <Route path={AppRoute.TrainingCard} element={<TrainingCardScreen/>}/>

          <Route path='*' element={<IntroScreen/>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );}

export default App;
