import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getIsLoadingComplete } from '../../../store/user-data/selectors';
import { getListLimit, getListPageNumber } from '../../../store/user-process/selector';
import LoadingScreen from '../../../pages/loading-screen/loading-screen';
import { HelmetProvider } from 'react-helmet-async';
import { ArrowCheck, ArrowLeft } from '../../svg-const/svg-const';
import { CaloriesQtt, MAXIMUMPRICE } from '../../../common/constant.user';
import useDigitalInput from '../../../hooks/use-digital-input';
import { Rating, SortingType } from '../../../common/constant';
import { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { typesOfTraining } from '../../../common/constant.training';
import { AppRoute } from '../../../common/const';
import { TrainingListForCatalogQuery } from '../../../types/training-list-for-catalog-query';
import { resetPaging } from '../../../store/user-process/user-process';
import { getTrainingListForCatalog } from '../../../store/api-action';


function TrainingsCatalogFilter():JSX.Element {
  const navigate = useNavigate();
  const page = useAppSelector(getListPageNumber);
  const limit = useAppSelector(getListLimit);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const dispatch = useAppDispatch();

  const [trainingTypes, setTrainingTypes] = useState([typesOfTraining[0]]);
  const priceMin = useDigitalInput('0',0,MAXIMUMPRICE);
  const priceMax = useDigitalInput(MAXIMUMPRICE.toString(),0,MAXIMUMPRICE);
  const caloriesQttMin = useDigitalInput(CaloriesQtt.Min.toString(), CaloriesQtt.Min, CaloriesQtt.Max);
  const caloriesQttMax = useDigitalInput(CaloriesQtt.Max.toString(), CaloriesQtt.Min, CaloriesQtt.Max);
  const [ratingMin, setRatingMin] = useState(Rating.Min.toString());
  const [ratingMax, setRatingMax] = useState(Rating.Max.toString());
  const [sortingPriceType, setSortingPriceType] = useState(SortingType.None);

  const filterData:TrainingListForCatalogQuery = {typesOfTraining:trainingTypes.join(',') ,
    priceMin: priceMin.value.toString(),
    priceMax: priceMax.value.toString(),
    ratingMin: ratingMin,
    ratingMax: ratingMax,
    caloriesQttMin: caloriesQttMin.value,
    caloriesQttMax: caloriesQttMax.value,
    page:page,
    limit: limit,
    priceSortType: sortingPriceType};

  useEffect(() => {
    if(filterData){dispatch(getTrainingListForCatalog(filterData));}
    dispatch(resetPaging());}
  , [priceMin, priceMax, caloriesQttMin, caloriesQttMax, ratingMin, ratingMax, trainingTypes, page, sortingPriceType, limit]);
  const onChangePriceHandle = (event:number[]) => {
    priceMin.setValue(event[0].toString());
    priceMax.setValue(event[1].toString());
  };

  const onChangeCaloriesQttHandle = (event:number[]) => {
    caloriesQttMin.setValue(event[0].toString());
    caloriesQttMax.setValue(event[1].toString());
  };

  const onChangeRatingHandle = (event:number[]) => {
    setRatingMin(event[0].toString());
    setRatingMax(event[1].toString());
  };

  const updateTypesOftraining = (type: string) => {
    const newTrainingTypes = [...trainingTypes];
    newTrainingTypes.includes(type) ? newTrainingTypes.splice(trainingTypes.indexOf(type), 1) :
      newTrainingTypes.push(type);
    setTrainingTypes(newTrainingTypes);
  };

type ChoosTypesOfTraininngPropes = {
  item:string;
}
function ChoosTypesOfTraininng({item}: ChoosTypesOfTraininngPropes):JSX.Element{
  return(
    <li className="my-training-form__check-list-item">
      <div className="custom-toggle custom-toggle--checkbox">
        <label>
          <input
            type="checkbox"
            name="duration"
            value={item}
            checked={trainingTypes.includes(item)}
            onChange={()=>updateTypesOftraining(item)}
          />
          <span className="custom-toggle__icon">
            <svg width="9" height="6" aria-hidden="true">
              <ArrowCheck/>
            </svg>
          </span><span className="custom-toggle__label">{item}</span>
        </label>
      </div>
    </li>
  );
}
if (!isLoadingComplete){
  return(
    <HelmetProvider>
      <LoadingScreen/>
    </HelmetProvider>);}
return (
  <div className="gym-catalog-form">
    <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
    <div className="gym-catalog-form__wrapper">
      <button
        className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
        type="button"
        onClick={() => {navigate(AppRoute.Main);}}
      >
        <svg width="14" height="10" aria-hidden="true">
          <ArrowLeft/>
        </svg>
        <span>Назад</span>
      </button>
      <h3 className="gym-catalog-form__title">Фильтры</h3>
      <form className="gym-catalog-form__form">
        <div className="gym-catalog-form__block gym-catalog-form__block--price">
          <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
          <div className="filter-price">
            <div className="filter-price__input-text filter-price__input-text--min">
              <input
                type="number"
                id="text-min"
                name="text-min"
                {...priceMin.bind}
              />
              <label htmlFor="text-min">от</label>
            </div>
            <div className="filter-price__input-text filter-price__input-text--max">

              <input
                type="number"
                id="text-max"
                name="text-max"
                {...priceMax.bind}
              />
              <label htmlFor="text-max">до</label>
            </div>
          </div>
          <RangeSlider
            min='1'
            max={MAXIMUMPRICE}
            step='1'
            defaultValue={[25,75]}
            value={[priceMin.value,priceMax.value]}
            onInput={onChangePriceHandle}
          />
        </div>
        <div className="gym-catalog-form__block gym-catalog-form__block--calories">
          <h4 className="gym-catalog-form__block-title">Калории</h4>
          <div className="filter-calories">
            <div className="filter-calories__input-text filter-calories__input-text--min">
              <input
                type="number"
                id="text-min-cal"
                name="text-min-cal"
                {...caloriesQttMin.bind}
              />
              <label htmlFor="text-min-cal">от</label>
            </div>
            <div className="filter-calories__input-text filter-calories__input-text--max">
              <input
                type="number"
                id="text-max-cal"
                name="text-max-cal"
                {...caloriesQttMax.bind}
              />
              <label htmlFor="text-max-cal">до</label>
            </div>
          </div>
          <RangeSlider
            min={CaloriesQtt.Min}
            max={CaloriesQtt.Max}
            step='1'
            defaultValue={[CaloriesQtt.Min, CaloriesQtt.Max]}
            onInput={onChangeCaloriesQttHandle}
          />
        </div>
        <div className="gym-catalog-form__block gym-catalog-form__block--rating">
          <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
          <div className="filter-raiting">
            <RangeSlider
              min={Rating.Min}
              max={Rating.Max}
              step='1'
              defaultValue={[Rating.Min, Rating.Max]}
              onInput={onChangeRatingHandle}
            />
          </div>
        </div>
        <div className="gym-catalog-form__block gym-catalog-form__block--type">
          <h4 className="gym-catalog-form__block-title">Тип</h4>
          <ul className="gym-catalog-form__check-list">
            {typesOfTraining.map((item: string) => <ChoosTypesOfTraininng item={item} key={item}/>)}
          </ul>
        </div>
        <div className="gym-catalog-form__block gym-catalog-form__block--sort">
          <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
          <div className="btn-radio-sort gym-catalog-form__radio">
            <label>
              <input
                type="radio"
                name="sort"
                checked={sortingPriceType === SortingType.Asc}
                onChange={() => { (sortingPriceType === SortingType.Asc) ? setSortingPriceType(SortingType.None) : setSortingPriceType(SortingType.Asc); }}
              />
              <span className="btn-radio-sort__label">Дешевле</span>
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                checked={sortingPriceType === SortingType.Desc}
                onChange={() => { (sortingPriceType === SortingType.Desc) ? setSortingPriceType(SortingType.None) : setSortingPriceType(SortingType.Desc); }}
              />
              <span className="btn-radio-sort__label">Дороже</span>
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                checked={sortingPriceType === SortingType.Asc}
                onChange={() => { (sortingPriceType === SortingType.Asc) ? setSortingPriceType(SortingType.None) : setSortingPriceType(SortingType.Asc); }}
              />
              <span className="btn-radio-sort__label">Бесплатные</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  </div>
);
}

export default TrainingsCatalogFilter;
