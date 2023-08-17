import { ChangeEvent, FormEvent, useState } from 'react';
import { TrainingDescriptionLength, TrainingTitleLength, durationOfTraining, trainingGender, typesOfTraining } from '../../common/constant.training';
import { CaloriesQtt, levelsOfExperience } from '../../common/constant.user';
import useDigitalInput from '../../hooks/use-digital-input';
import useInput from '../../hooks/use-input';
import useTextarea from '../../hooks/use-textarea';
import { ArrowDown, IconImportVideo } from '../svg-const/svg-const';
import { capitalizeFirst } from '../../common/utils';
import { NewTrainingData } from '../../types/new-training-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createTraining } from '../../store/api-action';
import { getIsLoadingComplete, getLoggedUserId } from '../../store/user-data/selectors';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function NewTrainingForm():JSX.Element{

  const dispatch = useAppDispatch();
  const userId = useAppSelector(getLoggedUserId);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const trainingName = useInput('', TrainingTitleLength.Min, TrainingTitleLength.Max);
  const description = useTextarea('', TrainingDescriptionLength.Min, TrainingDescriptionLength.Max);
  const calory = useDigitalInput(CaloriesQtt.Min.toString(), CaloriesQtt.Min, CaloriesQtt.Max);
  const price = useDigitalInput('0', 0, undefined);
  const [trainingType, setTrainingType] = useState(typesOfTraining[0]);
  const [typesTrainingMenuOn, setTypesTrainingMenuOn] = useState(false);
  const [timeTraining, setTimeTraining] = useState(durationOfTraining[0]);
  const [timeTrainingMenuOn, setTimeTrainingMenuOn] = useState(false);
  const [expLevel, setExpLevel] = useState(levelsOfExperience[0]);
  const [expLevelMenuOn, setExpLevelMenuOn] = useState(false);
  const [userGender, setUserGender] = useState(trainingGender[0]);

  // useEffect(()=>{
  //   if(isLoadingComplete){
  //     dispatch(getUserById(userId));
  //   }
  // }, [dispatch, userId]);

  const onSubmit = (trainingData: NewTrainingData) => {
    dispatch(createTraining(trainingData));
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(userId && trainingName.isValid && description.isValid && calory.isValid && price){
      onSubmit({
        trainerId: userId,
        title: trainingName.value,
        caloriesQtt: parseInt(calory.value, 10),
        price: parseInt(price.value, 10),
        trainingGender: userGender,
        typeOfTraining: trainingType,
        duration: timeTraining,
        levelOfUser:expLevel,
        description: description.value,
        video: '',
      });
    }
  };

  const onChooseGenderClickHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setUserGender(evt.currentTarget.value);

  };

  type ChooseGenderPrope = {
    item: string;
  }
  function ChooseGender({item}: ChooseGenderPrope):JSX.Element{
    return(
      <div
        className="custom-toggle-radio__block"
        key={item}
      >
        <label>
          <input
            type="radio"
            name="sex"
            value={item}
            checked={userGender === item}
            onChange={onChooseGenderClickHandle}
          />
          <span className="custom-toggle-radio__icon"/>
          <span className="custom-toggle-radio__label">{capitalizeFirst(item)}</span>
        </label>
      </div>
    );
  }

  type ChooseExpLevelPrope = {
    item: string;
  }

  function ChooseExpLevel({item} :ChooseExpLevelPrope): JSX.Element{
    return(
      <li
        className="custom-select__item"
        value={item}
        onClick={()=>setExpLevel(item)}
      >{capitalizeFirst(item)}
      </li>
    );
  }
  type ChooseTimeTraningPrope={
    item: string;
  }

  function ChooseTimeTraining({item} :ChooseTimeTraningPrope): JSX.Element{
    return(
      <li
        className="custom-select__item"
        value={item}
        onClick={()=>setTimeTraining(item)}
      >{item}
      </li>
    );
  }
  type ChooseTrainingTypePrope = {
    item: string;
  }
  function ChooseTraining({item}: ChooseTrainingTypePrope): JSX.Element{
    return(
      <li
        className="custom-select__item"
        value={item}
        onClick={()=>setTrainingType(item)}
      >{capitalizeFirst(item)}
      </li>
    );
  }

  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}

  return(
    <div className="popup-form popup-form--create-training">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Создание тренировки</h1>
          </div>
          <div className="popup-form__form">
            <form
              action=""
              onSubmit={handleSubmit}
            >
              <div className="create-training">
                <div className="create-training__wrapper">
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Название тренировки</h2>
                    <div className="custom-input create-training__input">
                      <label>
                        <span className="custom-input__wrapper">
                          <input
                            type="text"
                            name="training-name"
                            {...trainingName.bind}
                          />
                        </span>
                      </label>
                    </div>
                    <p>{!trainingName.isValid ? `Название тренировки должно быть от ${TrainingTitleLength.Min} до ${TrainingTitleLength.Max}` : ''}</p>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Характеристики тренировки</h2>
                    <div className="create-training__info">
                      <div
                        className={`custom-select${typesTrainingMenuOn ? ' is-open not-empty' : ' not-empty'}`}
                        onClick={()=>{setTypesTrainingMenuOn(!typesTrainingMenuOn);}}
                      >
                        <span className="custom-select__label">Выберите тип тренировки</span>
                        <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                          <span className="custom-select__text">{capitalizeFirst(trainingType)}</span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <ArrowDown/>
                            </svg>
                          </span>
                        </button>
                        <ul className="custom-select__list" role="listbox">
                          {typesOfTraining.map((item:string) => (<ChooseTraining item={item} key={item}/>))}
                        </ul>
                      </div>
                      <div className="custom-input custom-input--with-text-right">
                        <label><span className="custom-input__label">Сколько калорий потратим</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              name="calories"
                              {...calory.bind}
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                          <p>{!calory.isValid ? `Количество каллорий должно быть от ${CaloriesQtt.Min} до ${CaloriesQtt.Max}` : ''}</p>
                        </label>
                      </div>
                      <div
                        className={`custom-select${timeTrainingMenuOn ? ' is-open not-empty' : ' not-empty'}`}
                        onClick={()=>{setTimeTrainingMenuOn(!timeTrainingMenuOn);}}
                      >
                        <span className="custom-select__label">Сколько времени потратим</span>
                        <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                          <span className="custom-select__text">{timeTraining}</span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <ArrowDown/>
                            </svg>
                          </span>
                        </button>
                        <ul className="custom-select__list" role="listbox">
                          {durationOfTraining.map((item:string) => (<ChooseTimeTraining item={item} key={item}/>))}
                        </ul>
                      </div>
                      <div className="custom-input custom-input--with-text-right">
                        <label>
                          <span className="custom-input__label">Стоимость тренировки</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              name="price"
                              {...price.bind}
                            />
                            <span className="custom-input__text">₽</span>
                          </span>
                          <p>{!price.isValid ? 'Цена - положительное число' : ''}</p>
                        </label>
                      </div>
                      <div
                        className={`custom-select${expLevelMenuOn ? ' is-open not-empty' : ' not-empty'}`}
                        onClick={()=>{setExpLevelMenuOn(!expLevelMenuOn);}}
                      >
                        <span className="custom-select__label">Выберите уровень тренировки</span>
                        <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                          <span className="custom-select__text">{capitalizeFirst(expLevel)}</span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <ArrowDown/>
                            </svg>
                          </span>
                        </button>
                        <ul className="custom-select__list" role="listbox">
                          {levelsOfExperience.map((item:string) => (<ChooseExpLevel item={item} key={item}/>))}
                        </ul>
                      </div>
                      <div className="create-training__radio-wrapper"><span className="create-training__label">Кому подойдет тренировка</span>
                        <div className="custom-toggle-radio create-training__radio">
                          {trainingGender.map((item:string) => (<ChooseGender item={item} key={item}/>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Описание тренировки</h2>
                    <div className="custom-textarea create-training__textarea">
                      <label>
                        <textarea
                          name="description"
                          placeholder=" "
                          {...description.bind}
                        />
                        <p>{!description.isValid ? `Описание должно быть от ${TrainingDescriptionLength.Min} до ${TrainingDescriptionLength.Max} символов` : ''}</p>
                      </label>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                    <div className="drag-and-drop create-training__drag-and-drop">
                      <label>
                        <span className="drag-and-drop__label" >Загрузите сюда файлы формата MOV, AVI или MP4
                          <svg width="20" height="20" aria-hidden="true">
                            <IconImportVideo/>
                          </svg>
                        </span>
                        <input type="file" name="import" accept=".mov, .avi, .mp4"/>
                      </label>
                    </div>:
                  </div>
                </div>
                <button className="btn create-training__button" type="submit">Опубликовать</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTrainingForm;
