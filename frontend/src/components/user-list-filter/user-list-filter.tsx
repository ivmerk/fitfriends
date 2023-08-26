import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ArrowCheck, ArrowDown, ArrowLeft } from '../svg-const/svg-const';
import { levelsOfExperience, userLocations } from '../../common/constant.user';
import { DEFAULT_CARDS_COUNT, DEFAULT_USER_MENU_ITEMS_COUNT } from '../../common/constant';
import { typesOfTraining } from '../../common/constant.training';
import { capitalizeFirst } from '../../common/utils';
import { getListPageNumber } from '../../store/user-process/selector';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { getIsLoadingComplete } from '../../store/user-data/selectors';
import { HelmetProvider } from 'react-helmet-async';
import { getUserList } from '../../store/api-action';
import { useNavigate } from 'react-router-dom';
import { resetPaging } from '../../store/user-process/user-process';

function UserListFilter():JSX.Element{
  const navigate = useNavigate();
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const pageOfList = useAppSelector(getListPageNumber);
  const dispatch = useAppDispatch();

  const [choosingLocations,setChoosingLocations] = useState<string[]>([userLocations[0]]);
  const [choosingTypesOfTraining, setChoosingTypesOfTraining] = useState<string[]>([typesOfTraining[0]]);
  const [choosingOfExperience, setChoosingOfExperience] = useState(levelsOfExperience[0]);

  const [locationMenuItemsCount, setLocationMenuItemsCount ] = useState( DEFAULT_USER_MENU_ITEMS_COUNT );
  const [typesOfTrainingMenuItemsCount, setTypesOfTrainingMenuItemsCount] = useState(DEFAULT_USER_MENU_ITEMS_COUNT);

  function updateTypesOfTraining(type:string) {
    const newCoosingTypes = [...choosingTypesOfTraining];
    newCoosingTypes.includes(type) ? newCoosingTypes.splice(newCoosingTypes.indexOf(type), 1) : newCoosingTypes.push(type);
    setChoosingTypesOfTraining(newCoosingTypes);
  }

  function updateChoosingLocations (location: string) {
    const newChoosingLocations = [...choosingLocations];
    newChoosingLocations.includes(location) ? newChoosingLocations.splice(newChoosingLocations.indexOf(location), 1) :
      newChoosingLocations.push(location);
    setChoosingLocations(newChoosingLocations);
  }

type ChoosingTypesOfTrainingPrope = {
  item: string;
}
function ChoosingTypesOfTraining({item}:ChoosingTypesOfTrainingPrope):JSX.Element{
  return(
    <li className="user-catalog-form__check-list-item">
      <div className="custom-toggle custom-toggle--checkbox">
        <label>
          <input
            type="checkbox"
            value={item}
            name="spezialization"
            checked={choosingTypesOfTraining.includes(item)}
            onChange={()=>{updateTypesOfTraining(item);}}
          />
          <span className="custom-toggle__icon">
            <svg width="9" height="6" aria-hidden="true">
              <ArrowCheck/>
            </svg>
          </span><span className="custom-toggle__label">{capitalizeFirst(item)}</span>
        </label>
      </div>
    </li>
  );
}
function ShowMoreTypesOfTrainindButtom():JSX.Element{
  return(
    <button
      className="btn-show-more user-catalog-form__btn-show"
      type="button"
      onClick={() => {setTypesOfTrainingMenuItemsCount(typesOfTraining.length);}}
    ><span>Посмотреть все</span>
      <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
        <ArrowDown/>
      </svg>
    </button>
  );
}

  type LocationMenuItemPrope = {
    item: string;
  }
  function LocationMenuItem({item} : LocationMenuItemPrope):JSX.Element{
    return (
      <li className="user-catalog-form__check-list-item">
        <div className="custom-toggle custom-toggle--checkbox">
          <label>
            <input
              type="checkbox"
              value={item}
              name="user-agreement"
              checked={choosingLocations.includes(item)}
              onChange={()=> {updateChoosingLocations(item);}}
            />
            <span className="custom-toggle__icon">
              <svg width="9" height="6" aria-hidden="true">
                <ArrowCheck/>
              </svg>
            </span>
            <span className="custom-toggle__label">{item}</span>
          </label>
        </div>
      </li>
    );
  }
  function ShowMoreLocationsButtom():JSX.Element{
    return (
      <button
        className="btn-show-more user-catalog-form__btn-show"
        type="button"
        onClick={() => {setLocationMenuItemsCount(userLocations.length);}}
      ><span>Посмотреть все</span>
        <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
          <ArrowDown/>
        </svg>
      </button>
    );
  }

  type ChooseLevelOfExpPrope = {item:string}
  function ChooseLevelOfExp({item} : ChooseLevelOfExpPrope): JSX.Element {
    return(
      <div className="custom-toggle-radio__block">
        <label>
          <input
            type="radio"
            name="user-agreement"
            checked={choosingOfExperience === item}
            onChange={() =>{setChoosingOfExperience(item);}}
          />
          <span className="custom-toggle-radio__icon">
          </span>
          <span className="custom-toggle-radio__label">{capitalizeFirst(item)}</span>
        </label>
      </div>
    );
  }

  useEffect(()=>{
    dispatch(getUserList({
      limit: DEFAULT_CARDS_COUNT,
      page: pageOfList,
      locations:choosingLocations.join(','),
      levelOfExperience: choosingOfExperience,
      typesOfTraining:choosingTypesOfTraining.join(','),
    }));
  },[pageOfList ]);

  useEffect(()=>{
    dispatch(resetPaging);
    dispatch(getUserList({
      limit: DEFAULT_CARDS_COUNT,
      page: pageOfList,
      locations:choosingLocations.join(','),
      levelOfExperience: choosingOfExperience,
      typesOfTraining:choosingTypesOfTraining.join(','),
    }));
  },[ choosingLocations, choosingTypesOfTraining, choosingOfExperience]);
  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}
  return(
    <div className="user-catalog-form">
      <h2 className="visually-hidden">Каталог пользователя</h2>
      <div className="user-catalog-form__wrapper">
        <button
          className="btn-flat btn-flat--underlined user-catalog-form__btnback"
          type="button"
          onClick={()=>{navigate(-1);}}
        >
          <svg width="14" height="10" aria-hidden="true">
            <ArrowLeft/>
          </svg><span>Назад</span>
        </button>
        <h3 className="user-catalog-form__title">Фильтры</h3>
        <form className="user-catalog-form__form">
          <div className="user-catalog-form__block user-catalog-form__block--location">
            <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
            <ul className="user-catalog-form__check-list">
              { userLocations.slice(0, locationMenuItemsCount).map((item) => (<LocationMenuItem item={item} key={item}/>))}
            </ul>
            {userLocations.length > locationMenuItemsCount ? <ShowMoreLocationsButtom/> : ''}
          </div>
          <div className="user-catalog-form__block user-catalog-form__block--spezialization">
            <h4 className="user-catalog-form__block-title">Специализация</h4>
            <ul className="user-catalog-form__check-list">
              {typesOfTraining.slice(0,typesOfTrainingMenuItemsCount).map((item) => (<ChoosingTypesOfTraining item={item} key={item}/>))}
            </ul>
            {typesOfTraining.length > typesOfTrainingMenuItemsCount ? <ShowMoreTypesOfTrainindButtom/> : ''}
          </div>
          <div className="user-catalog-form__block user-catalog-form__block--level">
            <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
            <div className="custom-toggle-radio">
              {levelsOfExperience.map((item) => (<ChooseLevelOfExp item={item} key={item}/>))}
            </div>
          </div>
          <div className="user-catalog-form__block">
            <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
            <div className="btn-radio-sort">
              <label>
                <input
                  type="radio"
                  name="sort"
                  defaultChecked
                />
                <span className="btn-radio-sort__label">Тренеры</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                />
                <span className="btn-radio-sort__label">Пользователи</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserListFilter;
