import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import SignUpScreen from '../../pages/sign-up-screen/sign-up-screen';
import RegistrationScreen from '../../pages/registration-screen/registration-screen';
import TrainerRoomScreen from '../../pages/trainer-room-screen/trainer-room-screen';

function App(): JSX.Element {
  return(
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={
          <MainScreen/>
        }
        />
        <Route path={AppRoute.SingUp} element={<SignUpScreen/>}/>
        <Route path={AppRoute.Registration} element={<RegistrationScreen/>}/>
        <Route path={AppRoute.TrainerRoom} element={<TrainerRoomScreen/>}/>
      </Routes>
    </BrowserRouter>
  );}

export default App;
