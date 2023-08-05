import BackgroundLogo from '../../components/backgroung-logo/background-logo';
import RegistrationFormBegin from '../../components/registration-form-begin/registration-form-begin';
import { useAppSelector } from '../../hooks';
import { getUserCommon } from '../../store/user-process/selector';
import { UserRole } from '../../types/user-role.enum';
import QuestionnaireUser from '../../components/questionnaire-user/questionnaire-user';
import QuestionnaireCoach from '../../components/questionnaire-coach/questionnaire-coach';


function RegistrationScreen():JSX.Element{
  const registrationStatus = useAppSelector(getUserCommon);


  function RegistrationDetailsForm():JSX.Element{
    return(
      registrationStatus && (registrationStatus.userRole === UserRole.Client) ? <QuestionnaireUser/> : <QuestionnaireCoach/>
    );}
  return(
    <>
      <BackgroundLogo/>
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          { !registrationStatus ?
            <RegistrationFormBegin/>
            : <RegistrationDetailsForm/>}
        </div>
      </div>


    </>
  );
}

export default RegistrationScreen;
