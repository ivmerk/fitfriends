import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute} from '../../common/const';
import MainScreen from '../../pages/main-screen/main-screen';
import SignUpScreen from '../../pages/sign-up-screen/sign-up-screen';
import RegistrationScreen from '../../pages/registration-screen/registration-screen';
import TrainerRoomScreen from '../../pages/trainer-room-screen/trainer-room-screen';
import IntroScreen from '../../pages/intro-screen/intro-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import NewTrainingForm from '../new-training-form/new-training-form';
import TrainersInfo from '../trainer-info/trainer-info';
import MyTrainingListBlock from '../my-training-list-block/my-training-list-block';
import MyOrdersTrainerroom from '../my-orders-trainerroom/my-orders-trainerroom';
import { HelmetProvider } from 'react-helmet-async';
import UserListScreen from '../../pages/user-list-screen/user-list-screen';
import ClientCardScreen from '../../pages/client-card-screen/client-card-screen';
import TrainerCardScreen from '../../pages/trainer-card-screen/trainer-card-screen';
import TrainingCardScreen from '../../pages/training-card-screen/training-card-screen';
import TrainingsCatalogScreen from '../../pages/training-catalog-screen/training-catalog-screen';
import ClientRoomScreen from '../../pages/client-room-screen/client-room-screen';
import ClientRoomInfo from '../client-room-info/client-room-info';
import MyFriends from '../my-friends/my-friends';
import ClientPurchases from '../client-purchases/client-purchases';
import { useEffect } from 'react';
import { REFRESH_TOKEN_KEY_NAME } from '../../common/constant';
import { refreshTokenAction } from '../../store/api-action';
import { dropToken } from '../../services/token';

export function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (localStorage.getItem(REFRESH_TOKEN_KEY_NAME)) {
      dispatch(refreshTokenAction());
    }
    return () => dropToken();
  }, []);
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
            <Route path={AppRoute.MyFriends} element={
              <PrivateRoute
                authorizationStatus = {authorizationStatus}
              >
                <MyFriends/>

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
          <Route path={AppRoute.TrainingsCatalog} element={<TrainingsCatalogScreen/>}/>
          <Route path={AppRoute.ClientRoom} element={<ClientRoomScreen/>}>
            <Route path={AppRoute.Info} element={
              <PrivateRoute
                authorizationStatus = {authorizationStatus}
              >
                <ClientRoomInfo/>

              </PrivateRoute>
            }
            />
            <Route path={AppRoute.MyFriends} element={
              <PrivateRoute
                authorizationStatus = {authorizationStatus}
              >
                <MyFriends/>

              </PrivateRoute>
            }
            />
            <Route path={AppRoute.MyPurchases} element={
              <PrivateRoute
                authorizationStatus = {authorizationStatus}
              >
                <ClientPurchases/>

              </PrivateRoute>
            }
            />
          </Route>
          <Route path={AppRoute.TrainingCard} element={<TrainingCardScreen/>}/>

          <Route path='*' element={<IntroScreen/>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );}

export default App;
