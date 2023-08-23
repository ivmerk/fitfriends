import { TrainingOrderFeed } from '../../types/training-order-feed';
import { IconChart, IconInfo, IconStar, IconWallet } from '../svg-const/svg-const';

type OrderTrainingCardProps = {
  card: TrainingOrderFeed;
}

function OrderTrainingCard({card}:OrderTrainingCardProps):JSX.Element{
  const {title, typeOfTraining, caloriesQtt, price, description, rating, totalPaymentAmount, trainingQtt, backgroundPicture} = card;
  return(
    <li className="my-orders__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp" srcSet={`/${backgroundPicture}.webp, /${backgroundPicture}@2x.webp 2x`}/>
              <img src={`/${backgroundPicture}.jpg`} srcSet={`/${backgroundPicture}@2x.jpg 2x`} width="330" height="190" alt=""/>
            </picture>
          </div>
          <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{price}</span><span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">{title}</h2>
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
                <IconStar/>
              </svg><span className="thumbnail-training__rate-value">{rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          <button
            className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
            onClick={() => null}
          >
            <svg width="18" height="18" aria-hidden="true">
              <IconInfo/>
            </svg><span>Подробнее</span>
          </button>
        </div>
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true">
              <IconChart/>
            </svg>
            <p className="thumbnail-training__total-info-value">{trainingQtt}</p>
            <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true">
              <IconWallet/>
            </svg>
            <p className="thumbnail-training__total-info-value">{totalPaymentAmount}<span>₽</span></p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrderTrainingCard;
