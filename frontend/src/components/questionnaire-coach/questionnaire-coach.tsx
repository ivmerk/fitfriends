import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { capitalizeFirst } from '../../common/utils';
import { typesOfTraning } from '../../common/constant.training';
import { MAXIMUM_TRAINING_TYPES_CHOICE, TrainerMeritLength, levelsOfExperience } from '../../common/constant.user';
import { ArrowCheck, IconImport } from '../svg-const/svg-const';
import { UserFormRegisterDetailsTrainer, UserUpdateData } from '../../types/user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logInAction, updateUser } from '../../store/api-action';
import { getIsRegistrationComplete, getRegistredUser } from '../../store/user-data/selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function QuestionnaireCoach():JSX.Element {
  const dispatch = useAppDispatch();
  const isRegistrationComplete = useAppSelector(getIsRegistrationComplete);
  const registredUser = useAppSelector(getRegistredUser);
  const navigate = useNavigate();

  const maritRef = useRef<HTMLTextAreaElement| null>(null);

  const [typesOfTraining, setChoosingTypesOfTraining] = useState<string[]>([]);
  const[levelExperience, setLevelExperience] = useState(levelsOfExperience[0]);
  const[isPersonalTrainingAprooved, setIsPersonalTrainingAprooved] = useState(false);
  const[validMarit, setValidMarit] = useState(false);
  const [validTypesOfTraining, setValidTypesOfTraining] = useState(true);

  useEffect( ()=>{
    if(isRegistrationComplete && registredUser) {
      dispatch(logInAction({login: registredUser.userMail, password: registredUser.password})); }
  }, [isRegistrationComplete, registredUser, dispatch]);

  const onSubmit = (user: UserFormRegisterDetailsTrainer) => {
    const updatedUser :UserUpdateData = {...user};
    dispatch(updateUser(updatedUser));
    if(isRegistrationComplete) {
      navigate(AppRoute.TrainerRoom);
    }
  };


  const handleSubmit = (evt: FormEvent<HTMLElement>) =>{
    evt.preventDefault();
    if(typesOfTraining.length && validMarit && maritRef.current && validTypesOfTraining){
      onSubmit({
        typesOfTraining: typesOfTraining,
        levelOfExperience: levelExperience,
        sertificates: [],
        merit: maritRef.current.value,
        readinessForPrivate: isPersonalTrainingAprooved,
      });
    }
  };

  const onChooseLevelExperienceHandle = (evt:ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setLevelExperience(evt.currentTarget.value);
  };

  const updateChoosingTypesOfTraining = (kindOfTraining:string) => {
    const newChoosingTypesOfTraining :string[] = [...typesOfTraining];
    newChoosingTypesOfTraining.includes(kindOfTraining) ?
      newChoosingTypesOfTraining.splice(newChoosingTypesOfTraining.indexOf(kindOfTraining), 1) :
      newChoosingTypesOfTraining.push(kindOfTraining);
    setChoosingTypesOfTraining(newChoosingTypesOfTraining);
    setValidTypesOfTraining(typesOfTraining.length >= MAXIMUM_TRAINING_TYPES_CHOICE);
  };
  const onMeritKeyDownCaptureHandle = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    if(maritRef.current){
      if(maritRef.current.value.length >= TrainerMeritLength.Min && maritRef.current.value.length <= TrainerMeritLength.Max){
        setValidMarit(true);
      } else { setValidMarit(false);}
    }
  };

  type ChooseLevelExperiencePrope ={
    item: string;
  }

  function ChooseLevelExperience ({item}: ChooseLevelExperiencePrope): JSX.Element {
    return(
      <div className="custom-toggle-radio__block">
        <label>
          <input
            type="radio"
            name="level"
            value={item}
            checked={item === levelExperience}
            onChange={onChooseLevelExperienceHandle}
          />
          <span className="custom-toggle-radio__icon"></span>
          <span className="custom-toggle-radio__label">{item}</span>
        </label>
      </div>
    );
  }

  type ChooseTrainingTypePrope = {
    item: string;
  }
  function ChooseTrainingType({item} : ChooseTrainingTypePrope):JSX.Element{
    return(
      <div className="btn-checkbox">
        <label>
          <input
            className="visually-hidden"
            type="checkbox"
            name="specialisation"
            value={item}
            checked={typesOfTraining.includes(item)}
            onChange={() => {updateChoosingTypesOfTraining(item);}}
          />
          <span className="btn-checkbox__btn">{capitalizeFirst(item)}</span>
        </label>
      </div>
    );
  }

  return(
    <div className="popup-form popup-form--questionnaire-coach">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <form
            className="popup-form__form"
            action=''
            onSubmit={handleSubmit}
          >
            <div className="questionnaire-coach">
              <h1 className="visually-hidden">Опросник</h1>
              <div className="questionnaire-coach__wrapper">
                <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваша специализация (тип) тренировок</span>
                  <div className="specialization-checkbox questionnaire-coach__specializations">
                    {typesOfTraning.map((item: string) => (<ChooseTrainingType item={item} key={item}/>))}
                  </div>
                </div>
                <div className="questionnaire-coach__block">
                  <span className="questionnaire-coach__legend">Ваш уровень</span>
                  <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                    {levelsOfExperience.map((item:string) => <ChooseLevelExperience item={item} key={item}/>)}
                  </div>
                </div>
                <div className="questionnaire-coach__block">
                  <span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
                  <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                    <label>
                      <span className="drag-and-drop__label">Загрузите сюда файлы формата PDF, JPG или PNG
                        <svg width="20" height="20" aria-hidden="true">
                          <IconImport/>
                        </svg>
                      </span>
                      <input type="file" name="import" accept=".pdf, .jpg, .png"/>
                    </label>
                  </div>
                </div>
                <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                  <div className="custom-textarea questionnaire-coach__textarea">
                    <label>
                      <textarea
                        name="description"
                        placeholder=""
                        ref={maritRef}
                        onChange={onMeritKeyDownCaptureHandle}

                      />
                    </label>
                  </div>
                  <div className="questionnaire-coach__checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="individual-training"
                        name="individual-training"
                        onChange={()=> setIsPersonalTrainingAprooved(!isPersonalTrainingAprooved)}
                        checked={isPersonalTrainingAprooved}
                      />
                      <span className="questionnaire-coach__checkbox-icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <ArrowCheck/>
                        </svg>
                      </span><span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                    </label>
                  </div>
                </div>
              </div>
              <button className="btn questionnaire-coach__button" type="submit">Продолжить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default QuestionnaireCoach;
