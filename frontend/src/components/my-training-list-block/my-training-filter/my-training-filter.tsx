import { useEffect, useState } from 'react';
import { getTrainerTrainingList } from '../../../store/api-action';
import { CaloriesQtt, MAXIMUMPRICE } from '../../../common/constant.user';
import { durationOfTraining } from '../../../common/constant.training';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import useDigitalInput from '../../../hooks/use-digital-input';
import { ArrowCheck, ArrowLeft } from '../../svg-const/svg-const';
import { Rating } from '../../../common/constant';
import { useNavigate } from 'react-router-dom';
import { getListLimit, getListPageNumber, getListSortingAscType } from '../../../store/user-process/selector';

function MyTrainingFilter():JSX.Element {
  const navigate = useNavigate();
  const page = useAppSelector(getListPageNumber);
  const limit = useAppSelector(getListLimit);
  const listSortingAscType = useAppSelector(getListSortingAscType);

  const dispatch = useAppDispatch();

  const [durations, setDurations] = useState([durationOfTraining[0]]);
  const priceMin = useDigitalInput('0',0,MAXIMUMPRICE);
  const priceMax = useDigitalInput(MAXIMUMPRICE.toString(),0,MAXIMUMPRICE);
  const caloriesQttMin = useDigitalInput(CaloriesQtt.Min.toString(), CaloriesQtt.Min, CaloriesQtt.Max);
  const caloriesQttMax = useDigitalInput(CaloriesQtt.Max.toString(), CaloriesQtt.Min, CaloriesQtt.Max);
  const [ratingMin, setRatingMin] = useState(Rating.Min.toString());
  const [ratingMax, setRatingMax] = useState(Rating.Max.toString());
  const filterData = {durations:durations ,
    priceMin: priceMin,
    priceMax: priceMax,
    ratingMin: ratingMin,
    ratingMax: ratingMax,
    caloriesQttMin: caloriesQttMin,
    caloriesQttMax: caloriesQttMax};

  useEffect(()=>{
    if(filterData){
      dispatch(getTrainerTrainingList( {durations:durations.join(',') ,
        priceMin: priceMin.value,
        priceMax: priceMax.value,
        caloriesQttMin: caloriesQttMin.value,
        caloriesQttMax: caloriesQttMax.value,
        ratingMin: ratingMin,
        ratingMax: ratingMax,
        page:page,
        limit:limit,
        priceSortType: (listSortingAscType ? 'acs' : 'decs'),
      }));}

  }, [priceMin, priceMax, caloriesQttMin, caloriesQttMax, durations]);


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

  const updateChoosingDurations = (duration: string ) => {
    const newDurations:string[] = [...durations];
    newDurations.includes(duration) ? newDurations.splice(durations.indexOf(duration), 1) :
      newDurations.push(duration);
    setDurations(newDurations);
  };

type ChooseDurationsPrope = {
  item: string;
}

function ChooseDurations({item}: ChooseDurationsPrope):JSX.Element{
  return(
    <li className="my-training-form__check-list-item">
      <div className="custom-toggle custom-toggle--checkbox">
        <label>
          <input
            type="checkbox"
            name="duration"
            value={item}
            checked={durations.includes(item)}
            onChange={()=>updateChoosingDurations(item)}
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
return(
  <div className="my-training-form">
    <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
    <div className="my-training-form__wrapper">
      <button
        className="btn-flat btn-flat--underlined my-training-form__btnback"
        type="button"
        onClick={()=>{navigate(-1);}}
      >
        <svg width="14" height="10" aria-hidden="true">
          <ArrowLeft/>
        </svg><span>Назад</span>
      </button>
      <h3 className="my-training-form__title">фильтры</h3>
      <form className="my-training-form__form">
        <div className="my-training-form__block my-training-form__block--price">
          <h4 className="my-training-form__block-title">Цена, ₽</h4>
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
        <div className="my-training-form__block my-training-form__block--calories">
          <h4 className="my-training-form__block-title">Калории</h4>
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
        <div className="my-training-form__block my-training-form__block--raiting">
          <h4 className="my-training-form__block-title">Рейтинг</h4>
          <div className="filter-raiting">
            <div className="filter-raiting__scale">
              <div className="filter-raiting__bar">
                <span className="visually-hidden">Полоса прокрутки</span>
              </div>
            </div>
            <RangeSlider
              min={Rating.Min}
              max={Rating.Max}
              step='1'
              defaultValue={[Rating.Min, Rating.Max]}
              onInput={onChangeRatingHandle}
            />
            <div className="filter-raiting__control">
              <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное значение</span></button><span>0</span>
              <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное значение</span></button><span>5</span>
            </div>
          </div>
        </div>
        <div className="my-training-form__block my-training-form__block--duration">
          <h4 className="my-training-form__block-title">Длительность</h4>
          <ul className="my-training-form__check-list">
            {durationOfTraining.map((item:string) => <ChooseDurations item={item} key={item}/> )}
          </ul>
        </div>
      </form>
    </div>
  </div>
);
}

export default MyTrainingFilter;
