import { useNavigate } from 'react-router-dom';
import { Training } from '../../types/training';
import { IconStart } from '../svg-const/svg-const';
import { AppRoute } from '../../common/const';

type SmallTrainingCardPropes = {
  itemType: string;
  selectedCard: Training;
}

function SmallTrainingCard({selectedCard, itemType}:SmallTrainingCardPropes):JSX.Element{
  const navigate = useNavigate();
  const {price, title, backgroundPicture, typeOfTraining, caloriesQtt, rating, description, trainingId} = selectedCard;
  return(
    <li className={itemType}>
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp" srcSet={`/${backgroundPicture}.webp, /${backgroundPicture}@2x.webp 2x`}/>
              <img src={`/${backgroundPicture}.jpg`} srcSet={`/${backgroundPicture}@2x.jpg 2x`} width="330" height="190" alt=""/>
            </picture>
          </div>
          <p className="thumbnail-training__price">{price ? `${price} ₽` : 'бесплатно'}
          </p>
          <h3 className="thumbnail-training__title">{title}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{typeOfTraining}</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{caloriesQtt}ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <IconStart/>
              </svg><span className="thumbnail-training__rate-value">{rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <button
              className="btn btn--small thumbnail-training__button-catalog"
              onClick={() => {if(trainingId){navigate(AppRoute.TrainingCard.replace(':id', trainingId?.toString()));}}}
            >Подробнее
            </button>
            <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SmallTrainingCard;
