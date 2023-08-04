import BackgroundLogo from '../../components/backgroung-logo/background-logo';
import RegistrationFormBegin from '../../components/registration-form-begin/registration-form-begin';

function RegistrationScreen():JSX.Element{
  return(
    <>
      <BackgroundLogo/>
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <RegistrationFormBegin/>
        </div>
      </div>


    </>
  );
}

export default RegistrationScreen;
