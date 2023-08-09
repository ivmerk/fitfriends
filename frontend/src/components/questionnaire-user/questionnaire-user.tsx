import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { durationOfTraining, typesOfTraning } from '../../common/constant.training';
import { capitalizeFirst } from '../../common/utils';
import { CaloriesQtt, CaloriesQttDaily, levelsOfExperience } from '../../common/constant.user';
import { UserFormRegisterDetailsClient, UserUpdateData } from '../../types/user';
import {useAppDispatch, useAppSelector } from '../../hooks';
import { logInAction, updateUser } from '../../store/api-action';
import { useNavigate } from 'react-router-dom';
import { getIsRegistrationComplete, getRegistredUser } from '../../store/user-data/selectors';
import { AppRoute } from '../../const';

function QuestionnaireUser():JSX.Element{
  const dispatch = useAppDispatch();
  const isRegistrationComplete = useAppSelector(getIsRegistrationComplete);
  const registredUser = useAppSelector(getRegistredUser);
  const navigate = useNavigate();

  const caloriesLoseRef = useRef<HTMLInputElement | null>(null);
  const caloriesWasteRef = useRef<HTMLInputElement | null>(null);

  const [choosingTypesOfTraining, setChoosingTypesOfTraining] = useState<string[]>([]);
  const [trainingDuration, setTrainingDuration] = useState(durationOfTraining[0]);
  const[levelExperience, setLevelExperience] = useState(levelsOfExperience[0]);
  const[validCaloriesLose, setValidCaloriesLose] = useState(false);
  const[validCaloriesWaste, setValidCaloriesWaste] = useState(false);


  useEffect( ()=>{
    if(isRegistrationComplete && registredUser) {
      dispatch(logInAction({login: registredUser.userMail, password: registredUser.password})); }
  }, [isRegistrationComplete, registredUser, dispatch]);

  const onSubmit = (user: UserFormRegisterDetailsClient)=>
  {
    const updatedUser :UserUpdateData = {...user};
    dispatch(updateUser(updatedUser));
    if(isRegistrationComplete) {
      navigate(AppRoute.Main);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLElement>) => {
    evt.preventDefault();
    if (choosingTypesOfTraining.length && validCaloriesLose && validCaloriesWaste && caloriesLoseRef.current && caloriesWasteRef.current) {
      onSubmit({
        typesOfTraining: choosingTypesOfTraining,
        levelOfExperience: levelExperience,
        timeOfTraining: trainingDuration,
        caloryLosingPlanTotal: Number.parseInt(caloriesLoseRef.current.value,10),
        caloryLosingPlanDaily: Number.parseInt(caloriesWasteRef.current.value, 10)
      });
    }
  };

  const onCaloriesLoseKeyDownCaptureHandle = (evt: ChangeEvent<HTMLInputElement>) =>
  {
    evt.preventDefault();
    if(caloriesLoseRef.current){
      if(Number.isInteger(Number.parseInt(caloriesLoseRef.current.value,10)) && Number.parseInt(caloriesLoseRef.current.value, 10) >= CaloriesQttDaily.Min && Number.parseInt(caloriesLoseRef.current.value, 10) <= CaloriesQttDaily.Max) {
        setValidCaloriesLose(true);
      } else{setValidCaloriesLose(false);}
    }
  };

  const onCaloriesWasteKeyDownCaptureHandle = (evt: ChangeEvent<HTMLInputElement>) =>
  {
    evt.preventDefault();
    if(caloriesWasteRef.current){
      if(Number.isInteger(Number.parseInt(caloriesWasteRef.current.value,10)) && Number.parseInt(caloriesWasteRef.current.value, 10) >= CaloriesQtt.Min && Number.parseInt(caloriesWasteRef.current.value, 10) <= CaloriesQtt.Max) {
        setValidCaloriesWaste(true);
      } else{setValidCaloriesWaste(false);}
    }
  };


  const updateChoosingTypesOfTraining = (kindOfTraining:string) => {
    const newChoosingTypesOfTraining :string[] = [...choosingTypesOfTraining];
    newChoosingTypesOfTraining.includes(kindOfTraining) ?
      newChoosingTypesOfTraining.splice(newChoosingTypesOfTraining.indexOf(kindOfTraining), 1) :
      newChoosingTypesOfTraining.push(kindOfTraining);
    setChoosingTypesOfTraining(newChoosingTypesOfTraining);
  };

  const onChooseTrainingDurationHandle = (evt: ChangeEvent<HTMLInputElement>) =>{
    evt.preventDefault();
    setTrainingDuration(evt.currentTarget.value);
  };

  const onChooseLevelExperienceHandle = (evt:ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setLevelExperience(evt.currentTarget.value);
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
            checked={choosingTypesOfTraining.includes(item)}
            onChange={() => {updateChoosingTypesOfTraining(item);}}
          />
          <span className="btn-checkbox__btn">{capitalizeFirst(item)}</span>
        </label>
      </div>
    );
  }

  type ChooseTrainingDurationPrope ={
    item:string;
  }
  function ChooseTrainingDuration({item}: ChooseTrainingDurationPrope):JSX.Element{
    return(
      <div className="custom-toggle-radio__block">
        <label>
          <input
            type="radio"
            name="time"
            value={item}
            checked={trainingDuration === item}
            onChange={onChooseTrainingDurationHandle}
          />
          <span className="custom-toggle-radio__icon"></span>
          <span className="custom-toggle-radio__label">{item}</span>
        </label>
      </div>
    );
  }

  return(
    <div className="popup-form popup-form--questionnaire-user">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <form
            className="popup-form__form"
            action=""
            onSubmit={handleSubmit}
          >
            <div className="questionnaire-user">
              <h1 className="visually-hidden">Опросник</h1>
              <div className="questionnaire-user__wrapper">
                <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                  <div className="specialization-checkbox questionnaire-user__specializations">
                    {typesOfTraning.map((item: string) => (<ChooseTrainingType item={item} key={item}/>))}
                  </div>
                </div>
                <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                  <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                    {durationOfTraining.map((item:string) => <ChooseTrainingDuration item={item} key={item}/>)}
                  </div>
                </div>
                <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                  <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                    {levelsOfExperience.map((item:string) => <ChooseLevelExperience item={item} key={item}/>)}
                  </div>
                </div>
                <div className="questionnaire-user__block">
                  <div className="questionnaire-user__calories-lose">
                    <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                    <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                      <label>
                        <span className="custom-input__wrapper">
                          <input
                            type="number"
                            name="calories-lose"
                            ref={caloriesLoseRef}
                            onChange={onCaloriesLoseKeyDownCaptureHandle}
                          />
                          <span className="custom-input__text">ккал</span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="questionnaire-user__calories-waste">
                    <span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                    <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                      <label>
                        <span className="custom-input__wrapper">
                          <input
                            type="number"
                            name="calories-waste"
                            ref={caloriesWasteRef}
                            onChange={onCaloriesWasteKeyDownCaptureHandle}
                          />
                          <span className="custom-input__text">ккал</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );}

export default QuestionnaireUser;

