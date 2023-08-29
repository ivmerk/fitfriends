import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ArrowCheck, ArrowLeft, ArrowRight} from '../svg-const/svg-const';
import { getIsLoadingTrainingComplete, getTrainingList } from '../../store/training-data/selector';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { askPersonalTraining, getTrainingListForUserFromTrainerWithId } from '../../store/api-action';
import { useParams } from 'react-router-dom';
import { DEFAULT_TRAININ_CARDS_COUNT } from '../../common/constant';
import SmallTrainingCard from '../small-training-card/small-training-card';
import { getUserFriends } from '../../store/user-data/selectors';

function TrainerCardTrainingList():JSX.Element{
  const params = useParams();
  const dispatch = useAppDispatch();
  const trainingList = useAppSelector(getTrainingList);
  const friendsList = useAppSelector(getUserFriends);
  const isLoadingTrainings = useAppSelector(getIsLoadingTrainingComplete);
  const trainerId = params.id;
  const [trainingCardsForScreen, setTrainingCardsForScreen] = useState(0);


  function MenuControl():JSX.Element{
    return(
      <div className="user-card-coach__training-bts">
        <button
          className="btn-icon user-card-coach__training-btn"
          type="button"
          aria-label="back"
          onClick={() => {if (trainingList && trainingCardsForScreen) {setTrainingCardsForScreen(trainingCardsForScreen - 1);}}}
        >
          <svg width="14" height="10" aria-hidden="true">
            <ArrowLeft/>
          </svg>
        </button>
        <button
          className="btn-icon user-card-coach__training-btn"
          type="button"
          aria-label="next"
          onClick={() => {if (trainingList && trainingCardsForScreen !== trainingList.length - DEFAULT_TRAININ_CARDS_COUNT) {setTrainingCardsForScreen(trainingCardsForScreen + 1);}}}
        >
          <svg width="14" height="10" aria-hidden="true">
            <ArrowRight/>
          </svg>
        </button>
      </div>
    );
  }

  useEffect(() => {
    if(trainerId){
      dispatch(getTrainingListForUserFromTrainerWithId(trainerId));}
  },[]);

  if (!isLoadingTrainings){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}

  return(
    <div className="user-card-coach__training">
      <div className="user-card-coach__training-head">
        <h2 className="user-card-coach__training-title">Тренировки</h2>
        <MenuControl/>
      </div>
      <ul className="user-card-coach__training-list">
        {(trainingList) ? trainingList.slice(trainingCardsForScreen, trainingCardsForScreen + DEFAULT_TRAININ_CARDS_COUNT).map((item) => <SmallTrainingCard selectedCard={item} itemType='user-card-coach__training-item' key={item.trainingId}/>) : ''}
      </ul>
      <form className="user-card-coach__training-form">
        { trainerId && (friendsList?.find((item) => item.friendId === parseInt(trainerId, 10) && item.isConfirmed === true)) ?
          (
            <button
              className="btn user-card-coach__btn-training"
              type="button"
              onClick={() => {dispatch(askPersonalTraining(trainerId));}}
            >
            Хочу персональную тренировку
            </button>) : ''}

        <div className="user-card-coach__training-check">
          <div className="custom-toggle custom-toggle--checkbox">
            <label>
              <input
                type="checkbox"
                value="user-agreement-1"
                name="user-agreement"
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <ArrowCheck/>
                </svg>
              </span><span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TrainerCardTrainingList;
