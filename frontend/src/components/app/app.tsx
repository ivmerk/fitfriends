import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import SignUpScreen from '../../pages/sign-up-screen/sign-up-screen';
import RegistrationScreen from '../../pages/registration-screen/registration-screen';
import TrainerRoomScreen from '../../pages/trainer-room-screen/trainer-room-screen';
import IntroScreen from '../../pages/intro-screen/intro-screen';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const authorizationStatus = AuthorizationStatus.Auth;
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
        <Route path={AppRoute.TrainerRoom} element={<TrainerRoomScreen/>}/>
        <Route path='*' element={<IntroScreen/>} />
      </Routes>
    </BrowserRouter>
  );}

export default App;
