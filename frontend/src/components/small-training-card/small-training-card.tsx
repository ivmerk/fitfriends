import { trainingCardsImage } from '../../common/constant';
import { Training } from '../../types/training';
import { IconStart } from '../svg-const/svg-const';

type SmallTrainingCardPropes = {
  selectedCard: Training;
}

function SmallTrainingCard({selectedCard:training}:SmallTrainingCardPropes):JSX.Element{
  const typeOfTraing = trainingCardsImage[4];
  return(
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source type="image/webp" srcSet={`/${typeOfTraing.img}.webp, /${typeOfTraing.img}@2x.webp 2x`}/>
            <img src={`/${typeOfTraing.img}.jpg`} srcSet={`/${typeOfTraing.img}@2x.jpg 2x`} width="330" height="190" alt=""/>
          </picture>
        </div>
        <p className="thumbnail-training__price">Бесплатно
        </p>
        <h3 className="thumbnail-training__title">{typeOfTraing.name}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#{typeOfTraing.nameCyr}</span></div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#1200ккал</span></div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <IconStart/>
            </svg><span className="thumbnail-training__rate-value">5</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">Сложный комплекс упражнений для профессиональных атлетов на&nbsp;отработку показателей в&nbsp;классическом стиле.</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
        </div>
      </div>
    </div>
  );
}

export default SmallTrainingCard;
