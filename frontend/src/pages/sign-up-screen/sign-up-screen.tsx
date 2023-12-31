import { useEffect } from 'react';
import BackgroundLogo from '../../components/backgroung-logo/background-logo';
import LoginForm from '../../components/login/login-form';
import { useAppSelector } from '../../hooks';
import { getLoggedUserRole } from '../../store/user-data/selectors';
import { UserRole } from '../../types/user-role.enum';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../common/const';

function SignUpScreen(): JSX.Element{
  const loggedUserRole = useAppSelector(getLoggedUserRole);

  const navigate = useNavigate();

  useEffect( () => {
    if(loggedUserRole === UserRole.Trainer){
      navigate(`${AppRoute.TrainerRoom}/${AppRoute.Info}`);}
    else if (loggedUserRole === UserRole.Client){setTimeout(()=>
      navigate(AppRoute.Main), 100);}},
  [loggedUserRole,navigate]
  );


  return(
    <>
      <BackgroundLogo/>
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <LoginForm/>
        </div>
      </div>
    </>
  );
}


export default SignUpScreen;
