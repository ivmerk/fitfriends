import { useAppDispatch, useAppSelector } from '../../hooks';
import { getLoggedUser } from '../../store/user-data/selectors';
import { ArrowCheck, ArrowDown, IconChange, IconEdit, IconTrash } from '../svg-const/svg-const';
import { useState } from 'react';
import { typesOfTraining } from '../../common/constant.training';
import { MAXIMUM_TRAINING_TYPES_CHOICE, UserDescriptionLength, UserTitleLength, levelsOfExperience, userGenders, userLocations } from '../../common/constant.user';
import { capitalizeFirst } from '../../common/utils';
import { getIsEdit } from '../../store/user-process/selector';
import { setToEdit } from '../../store/user-process/user-process';
import useInput from '../../hooks/use-input';
import useTextarea from '../../hooks/use-textarea';
import { updateUser } from '../../store/api-action';
import { hostPort } from '../../common/constant';

function UserInfo():JSX.Element{
  const user = useAppSelector(getLoggedUser);
  const isEdit = useAppSelector<boolean>(getIsEdit);
  const dispatch = useAppDispatch();


  const name = useInput(user?.userName || '', UserTitleLength.Min, UserTitleLength.Max);
  const description = useTextarea(user?.description || '', UserDescriptionLength.Min, UserDescriptionLength.Max);

  const [readenessForPrivat, setReadenessForPrivat] = useState(user?.trainerBody?.readinessForPrivate);
  const [choosingTypesOfTraining, setChoosingTypesOfTraining] = useState(user?.typesOfTraining);
  const [location, setLocation] = useState(user?.location);
  const [gender, setGender] = useState(user?.userGender);
  const [levelOfExp, setLevelOfExp] = useState(user?.levelOfExperience);

  const [validTypesOfTraining, setValidTypesOfTraining] = useState(true);
  const [locationMenuOn, setLocationMenuOn] = useState(false);
  const [genderMenuOn, setGenderMenuOn] = useState(false);
  const [profLevelMenuOn, setProfLevelMenuOn] = useState(false);

  const onSaveRedoButtonClickHandle = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!isEdit) {dispatch(setToEdit(true));} else{
      submit();
    }
  };


  const updateChoosingTypesOfTraining = (kindOfTraining:string) => {
    if(choosingTypesOfTraining){
      const newChoosingTypesOfTraining :string[] = [...choosingTypesOfTraining];
      newChoosingTypesOfTraining.includes(kindOfTraining) ?
        newChoosingTypesOfTraining.splice(newChoosingTypesOfTraining.indexOf(kindOfTraining), 1) :
        newChoosingTypesOfTraining.push(kindOfTraining);
      setChoosingTypesOfTraining(newChoosingTypesOfTraining);
      setValidTypesOfTraining(newChoosingTypesOfTraining.length <= MAXIMUM_TRAINING_TYPES_CHOICE);
    } };

  const submit = () => {
    if(name.isValid && description.isValid && validTypesOfTraining){
      const updateData = {
        trainerBody:{
          readinessForPrivate: readenessForPrivat},
        userName: name.value,
        description: description.value,
        location: location,
        userGender: gender,
        levelOfExperience: levelOfExp,
        typesOfTraining: choosingTypesOfTraining

      };
      dispatch(setToEdit(false));
      dispatch(updateUser(updateData));
    }
  };
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
            name="specialization"
            value={item}
            checked={choosingTypesOfTraining?.includes(item)}
            onChange={() => {updateChoosingTypesOfTraining(item);}}
          />
          <span className="btn-checkbox__btn">{item}</span>
        </label>
      </div>
    );
  }

  type ChooseLocationPrope = {
    item:string;
  }
  function ChooseLocation({item}: ChooseLocationPrope): JSX.Element{
    return(
      <li
        className="custom-select__item"
        value={item}
        onClick={()=>setLocation(item)}
      >{item}
      </li>
    );

  }

  type ChooseGenderPrope = {item:string}
  function ChooseGender({item}: ChooseGenderPrope): JSX.Element {
    return(
      <li
        className="custom-select__item"
        value={item}
        onClick={()=>setGender(item)}
      >{capitalizeFirst(item)}
      </li>
    );
  }
  type ChooseLevelOfExpPrope = {item:string}
  function ChooseLevelOfExp({item} : ChooseLevelOfExpPrope): JSX.Element {
    return(
      <li
        className="custom-select__item"
        value={item}
        onClick={()=>setLevelOfExp(item)}
      >{capitalizeFirst(item)}
      </li>
    );
  }

  function ImgMenu (): JSX.Element{
    return(
      <>
        <button className="user-info-edit__control-btn" aria-label="обновить">
          <svg width="16" height="16" aria-hidden="true">
            <IconChange/>
          </svg>
        </button>
        <button className="user-info-edit__control-btn" aria-label="удалить">
          <svg width="14" height="16" aria-hidden="true">
            <IconTrash/>
          </svg>
        </button>
      </>
    );
  }
  return(

    <section className="user-info-edit">
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg">
            </input>
            <span className="input-load-avatar__avatar">
              {user ? <img src={`${hostPort}${user?.userAvatar}`} srcSet={`${hostPort}${user?.userAvatar} 2x`} width="98" height="98" alt="user"/> : ''}
            </span>
          </label>
        </div>
        {isEdit ? <ImgMenu/> : ''}
      </div>
      <form
        className="user-info-edit__form"
        action=""
      >
        <button
          className="btn-flat btn-flat--underlined user-info-edit__save-button"
          type="submit"
          aria-label="Сохранить"
          onClick={onSaveRedoButtonClickHandle}
        >
          <svg width="12" height="12" aria-hidden="true">
            {!isEdit ? <IconEdit/> : ''}
          </svg>
          <span>{isEdit ? 'Сохранить' : 'Редактировать'}</span>
        </button>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title">Обо мне</h2>
          <div className={`custom-input${isEdit ? '' : ' is-disabled'} user-info-edit__input`}>
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  name="name"
                  {...name.bind}
                />
              </span>
              <p> {!name.isValid ? ` Имя должно быть от ${UserTitleLength.Min} до ${UserTitleLength.Max}` : ''}</p>
            </label>
          </div>
          <div className={`custom-textarea${isEdit ? '' : ' is-disabled'} user-info-edit__textarea`}>
            <label><span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                {...description.bind}
              />
            </label>
          </div>
          <p> {!description.isValid ? ` Описание должно быть от ${UserDescriptionLength.Min} до ${UserDescriptionLength.Max}` : ''}</p>
        </div>
        <div className={`user-info-edit__section${isEdit ? '' : ' is-disabled'} user-info-edit__section--status`}>
          <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
            <label>
              <input
                type="checkbox"
                name="ready-for-training"
                checked={readenessForPrivat}
                onChange={() => setReadenessForPrivat(!readenessForPrivat)}
                disabled={!isEdit}
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <ArrowCheck/>
                </svg>
              </span><span className="custom-toggle__label">Готов тренировать</span>
            </label>
          </div>
        </div>
        <div className={`user-info-edit__section${isEdit ? '' : ' is-disabled'} user-info-edit__section--status`}>
          <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info-edit__specialization">
            {typesOfTraining.map((item: string) => (<ChooseTrainingType item={item} key={item}/>))}
          </div>
          <p>{!validTypesOfTraining ? `Не более ${MAXIMUM_TRAINING_TYPES_CHOICE} тренеровок` : ''}</p>
        </div>
        <div className={isEdit ? `custom-select${locationMenuOn ? ' is-open not-empty' : ' not-empty'} user-info-edit__select` : 'custom-select is-disabled not-empty user-info-edit__select'}
          onClick={()=>{if (isEdit) {setLocationMenuOn(!locationMenuOn);}}}
        >
          <span className="custom-select__label">Локация</span>
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
            <span className="custom-select__text">ст. м. {location}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                {isEdit ? <ArrowDown/> : ''}
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {userLocations.map((item:string) => (<ChooseLocation item={item} key={item}/>))}
          </ul>
        </div>
        <div className={isEdit ? `custom-select${genderMenuOn ? ' is-open not-empty' : ' not-empty'} user-info-edit__select` : 'custom-select is-disabled not-empty user-info-edit__select'}
          onClick={()=>{if (isEdit) {setGenderMenuOn(!genderMenuOn);}}}
        >
          <span className="custom-select__label">Пол</span>
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
            <span className="custom-select__text">{gender ? capitalizeFirst(gender) : ''}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                {isEdit ? <ArrowDown/> : ''}
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {userGenders.map((item:string) => (<ChooseGender item={item} key={item}/>))}
          </ul>
        </div>
        <div className={isEdit ? `custom-select${profLevelMenuOn ? ' is-open not-empty' : ' not-empty'} user-info-edit__select` : 'custom-select is-disabled not-empty user-info-edit__select'}
          onClick={()=>{if (isEdit) {setProfLevelMenuOn(!profLevelMenuOn);}}}
        >
          <span className="custom-select__label">Уровень</span>
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
            <span className="custom-select__text">{levelOfExp ? capitalizeFirst(levelOfExp) : ''}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                {isEdit ? <ArrowDown/> : ''}
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {levelsOfExperience.map((item:string) => (<ChooseLevelOfExp item={item} key={item}/>))}
          </ul>
        </div>
      </form>
    </section>
  );
}
export default UserInfo;
