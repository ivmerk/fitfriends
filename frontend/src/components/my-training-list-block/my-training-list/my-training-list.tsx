import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../../hooks';
import TrainingCard from '../../small-training-card/small-training-card';
import LoadingScreen from '../../../pages/loading-screen/loading-screen';
import { getIsLoadingTrainingComplete, getTrainingList } from '../../../store/training-data/selector';


function MyTrainingList():JSX.Element{

  const trainingList = useAppSelector(getTrainingList);
  const isLoadingComplete = useAppSelector(getIsLoadingTrainingComplete);


  console.log(trainingList);
  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}

  return(
    <div className="my-trainings">
      <ul className="my-trainings__list">
        <li className="my-trainings__item">
          {/* <TrainingCard selectedCard={training} key={training} id={training}/> */}
        </li>
        <li className="my-trainings__item">
          <div className="thumbnail-training">
            <div className="thumbnail-training__inner">
              <div className="thumbnail-training__image">
                <picture>
                  <source type="image/webp" srcSet="/img/content/thumbnails/training-01.webp, /img/content/thumbnails/training-01@2x.webp 2x"></source>
                  <img src="/img/content/thumbnails/training-01.jpg" srcSet="/img/content/thumbnails/training-01@2x.jpg 2x" width="330" height="190" alt=""></img>
                </picture>
              </div>
              <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">800</span><span>₽</span>
              </p>
              <h3 className="thumbnail-training__title">energy</h3>
              <div className="thumbnail-training__info">
                <ul className="thumbnail-training__hashtags-list">
                  <li className="thumbnail-training__hashtags-item">
                    <div className="hashtag thumbnail-training__hashtag"><span>#пилатес</span></div>
                  </li>
                  <li className="thumbnail-training__hashtags-item">
                    <div className="hashtag thumbnail-training__hashtag"><span>#320ккал</span></div>
                  </li>
                </ul>
                <div className="thumbnail-training__rate">
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg><span className="thumbnail-training__rate-value">4</span>
                </div>
              </div>
              <div className="thumbnail-training__text-wrapper">
                <p className="thumbnail-training__text">Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и&nbsp;координацию.</p>
              </div>
              <div className="thumbnail-training__button-wrapper">
                <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div className="show-more my-trainings__show-more">
        <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
        <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
      </div>
    </div>
  );
}

export default MyTrainingList;
