import BackgroundLogo from '../../components/backgroung-logo/background-logo';
import RegistrationFormBegin from '../../components/registration-form-begin/registration-form-begin';
import { useAppSelector } from '../../hooks';
import { UserRole } from '../../types/user-role.enum';
import QuestionnaireUser from '../../components/questionnaire-user/questionnaire-user';
import QuestionnaireCoach from '../../components/questionnaire-coach/questionnaire-coach';
import { getRegistredUser } from '../../store/user-data/selectors';


function RegistrationScreen():JSX.Element{
  const registredUser = useAppSelector(getRegistredUser);


  function RegistrationDetailsForm():JSX.Element{
    return(
      registredUser && (registredUser.userRole === UserRole.Client) ? <QuestionnaireUser/> : <QuestionnaireCoach/>
    );}
  return(
    <>
      <BackgroundLogo/>
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          { !(registredUser) ?
            <RegistrationFormBegin/>
            : <RegistrationDetailsForm/>}
        </div>
      </div>


    </>
  );
}

export default RegistrationScreen;
