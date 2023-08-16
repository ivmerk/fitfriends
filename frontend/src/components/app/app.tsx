import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute} from '../../const';
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

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return(
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
        <Route path='/trainerroom' element={
          <TrainerRoomScreen/>
        }
        >
          <Route path='newtraining' element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <NewTrainingForm/>
            </PrivateRoute>
          }
          />
          <Route path='info' element={
            <PrivateRoute
              authorizationStatus = {authorizationStatus}
            >
              <TrainersInfo/>

            </PrivateRoute>
          }
          />
          <Route path='*' element={<h1>Страница не найдена</h1>}/>
        </Route>
        <Route path='*' element={<IntroScreen/>} />
      </Routes>
    </BrowserRouter>
  );}

export default App;
