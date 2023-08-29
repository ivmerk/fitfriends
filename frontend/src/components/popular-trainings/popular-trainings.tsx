import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getRecomendationTrainingList } from '../../store/training-data/selector';
import { ArrowLeft, ArrowRight } from '../svg-const/svg-const';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../common/const';
import { DEFAULT_MY_ORDER_ITEMS_COUNT } from '../../common/constant';
import SmallTrainingCard from '../small-training-card/small-training-card';

function PopularTrainings():JSX.Element{

  const navigate = useNavigate();
  const recomendedTraining = useAppSelector(getRecomendationTrainingList);
  const [screenItemCount, setScreenItemCount] = useState(0);

  return(
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              className="btn-flat popular-trainings__button"
              type="button"
              onClick={() => {navigate(AppRoute.MyTrainings);}}
            ><span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <ArrowRight/>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="previous"
                onClick={() =>{if(recomendedTraining && screenItemCount !== 0){setScreenItemCount(screenItemCount - 1);}}}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <ArrowLeft/>
                </svg>
              </button>
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="next"
                onClick={() => {if(recomendedTraining && screenItemCount !== recomendedTraining.length - DEFAULT_MY_ORDER_ITEMS_COUNT)
                {setScreenItemCount(screenItemCount + 1);
                }}}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <ArrowRight/>
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            {(recomendedTraining) ? recomendedTraining.slice(screenItemCount, screenItemCount + DEFAULT_MY_ORDER_ITEMS_COUNT).map((item) => <SmallTrainingCard selectedCard={item} itemType='my-trainings__item' key={item.trainingId}/>) : ''}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainings;
