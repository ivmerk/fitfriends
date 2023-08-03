import BackgroundLogo from '../../components/backgroung-logo/background-logo';
import LoginForm from '../../components/login/login-form';

function SignUpScreen(): JSX.Element{

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
