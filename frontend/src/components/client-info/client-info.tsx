import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsLoadingComplete, getLoggedUser, getUserAvatar } from '../../store/user-data/selectors';
import { ArrowCheck, IconChange, IconEdit, IconTrash } from '../svg-const/svg-const';
import { ChangeEvent, useEffect, useState } from 'react';
import { typesOfTraining } from '../../common/constant.training';
import { MAXIMUM_TRAINING_TYPES_CHOICE, UserDescriptionLength, UserTitleLength, levelsOfExperience, userGenders, userLocations } from '../../common/constant.user';
import { getIsEdit } from '../../store/user-process/selector';
import { setToEdit } from '../../store/user-process/user-process';
import useInput from '../../hooks/use-input';
import useTextarea from '../../hooks/use-textarea';
import { updateUser, uploadFileImg } from '../../store/api-action';
import { HOST_PORT } from '../../common/constant';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import useSelectListWithComponent from '../../hooks/use-select-list-with-component';

function ClientInfo():JSX.Element{
  const user = useAppSelector(getLoggedUser);
  const isEdit = useAppSelector<boolean>(getIsEdit);
  const dispatch = useAppDispatch();

  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const userAvatar = useAppSelector(getUserAvatar);
  const name = useInput(user?.userName || '', UserTitleLength.Min, UserTitleLength.Max);
  const description = useTextarea(user?.description || '', UserDescriptionLength.Min, UserDescriptionLength.Max);

  const [readenessForTraining, setReadenessForTraining] = useState(false);
  const [choosingTypesOfTraining, setChoosingTypesOfTraining] = useState<string[]>([]);

  const [validTypesOfTraining, setValidTypesOfTraining] = useState(true);

  const locationListMenu = useSelectListWithComponent(user?.location ? `ст. ${user.location}` : '', 'локация', userLocations.map((item) => `ст. ${item}`), isEdit);
  const genderListMenu = useSelectListWithComponent(user?.userGender ? user.userGender : '', 'пол', userGenders, isEdit);
  const levelOfExpListMenu = useSelectListWithComponent(user?.levelOfExperience ? user.levelOfExperience : '', 'уровень', levelsOfExperience, isEdit);

  const onSaveRedoButtonClickHandle = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!isEdit) {dispatch(setToEdit(true));} else{
      submit();
    }
  };

  const onFileHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    if(evt.target.files) {
      dispatch(uploadFileImg(evt.target.files[0]));
    }
  };

  function updateChoosingTypesOfTraining (kindOfTraining:string) {
    if(choosingTypesOfTraining){
      const newChoosingTypesOfTraining :string[] = [...choosingTypesOfTraining];
      newChoosingTypesOfTraining.includes(kindOfTraining) ?
        newChoosingTypesOfTraining.splice(newChoosingTypesOfTraining.indexOf(kindOfTraining), 1) :
        newChoosingTypesOfTraining.push(kindOfTraining);
      setChoosingTypesOfTraining(newChoosingTypesOfTraining);
      setValidTypesOfTraining(newChoosingTypesOfTraining.length <= MAXIMUM_TRAINING_TYPES_CHOICE);
    } }

  const submit = () => {
    if(name.isValid && description.isValid && validTypesOfTraining){
      const updateData = {
        clientBody:{
          readinessForPrivate: readenessForTraining},
        userName: name.value,
        description: description.value,
        location: locationListMenu.selectedOption.replace('ст. ', ''),
        userGender: genderListMenu.selectedOption,
        levelOfExperience: levelOfExpListMenu.selectedOption,
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

  function ImgMenu (): JSX.Element{
    return(
      <>
        <button
          className="user-info-edit__control-btn"
          aria-label="обновить"
          onClick={()=>{dispatch(updateUser({userAvatar:userAvatar}));}}
        >
          <svg width="16" height="16" aria-hidden="true">
            <IconChange/>
          </svg>
        </button>
        <button
          className="user-info-edit__control-btn"
          aria-label="удалить"
        >
          <svg width="14" height="16" aria-hidden="true">
            <IconTrash/>
          </svg>
        </button>
      </>
    );
  }
  useEffect(()=>{
    if(isLoadingComplete && user){
      setReadenessForTraining(user?.clientBody?.readinessForTraining || false);
      setChoosingTypesOfTraining(user?.typesOfTraining);
    }
  }, [isLoadingComplete, user]);
  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}

  return(
    <section className="user-info-edit">
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              accept="image/png, image/jpeg"
              onChange={onFileHandle}
            >
            </input>
            <span className="input-load-avatar__avatar">
              {user ? <img src={`${HOST_PORT}${user?.userAvatar}`} srcSet={`${HOST_PORT}${user?.userAvatar} 2x`} width="98" height="98" alt="user"/> : ''}
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
                checked={readenessForTraining}
                onChange={() => setReadenessForTraining(!readenessForTraining)}
                disabled={!isEdit}
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <ArrowCheck/>
                </svg>
              </span><span className="custom-toggle__label">Готов к тренировке</span>
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
        {locationListMenu.SelectComponent}
        {genderListMenu.SelectComponent}
        {levelOfExpListMenu.SelectComponent}
      </form>
    </section>
  );
}
export default ClientInfo;
