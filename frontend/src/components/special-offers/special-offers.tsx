import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getRecomendationTrainingList } from '../../store/training-data/selector';
import { Training } from '../../types/training';
import { LogoType } from '../svg-const/svg-const';
import AnnounceSpec from '../announce-spec/announce-spec';
import { PRICE_DISCOUNT } from '../../common/constant.training';

function SpecialOffers():JSX.Element{
  const recomendationTrainings = useAppSelector(getRecomendationTrainingList);

  const [sliderCount, setSliderCount] = useState(0);
type SpecialPromoOfferPropes = {
  card: Training;
}
function SpecialPromoOffer ({card}:SpecialPromoOfferPropes) {
  const {backgroundPicture, title, description, price} = card;
  return (
    <li className="special-offers__item is-active">
      <aside className="promo-slider">
        <div className="promo-slider__overlay"></div>
        <div className="promo-slider__image">
          <source type="image/webp" srcSet={`/${backgroundPicture}.webp, /${backgroundPicture}@2x.webp 2x`}/>
          <img src={`/${backgroundPicture}.jpg`} srcSet={`/${backgroundPicture}@2x.jpg 2x`} width="1040" height="469" alt="promo"/>
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">{title}</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <LogoType/>
            </svg>
          </div>
        </div><span className="promo-slider__text">{description}</span>
        <div className="promo-slider__bottom-container">
          <SliderDots/>
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">{price * PRICE_DISCOUNT} ₽</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">{price} ₽</p>
          </div>
        </div>
      </aside>
    </li>
  );
}
function SliderDots ():JSX.Element{
  return(
    <div className="promo-slider__slider-dots">
      {(recomendationTrainings) ? recomendationTrainings.filter((item) => item?.isPromo).map((item, index) =>
        (
          <button
            className={`${sliderCount === index ? 'promo-slider__slider-dot--active' : ''} promo-slider__slider-dot`}
            key={item?.trainingId}
            aria-label="первый слайд"
            onClick={()=>{setSliderCount(index);}}
          />)) : ''}

    </div>
  );
}
return(
  <section className="special-offers">
    <div className="container">
      <div className="special-offers__wrapper">
        <div className="special-offers__title__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
        </div>
        <ul className="special-offers__list">
          {(recomendationTrainings.find((item) => item.isPromo) ) ? <SpecialPromoOffer card={recomendationTrainings[sliderCount]}/> : <AnnounceSpec/>}
        </ul>
      </div>
    </div>
  </section>
);
}
export default SpecialOffers;
