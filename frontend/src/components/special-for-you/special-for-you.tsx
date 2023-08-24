import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getRecomendationTrainingList } from '../../store/training-data/selector';
import { ArrowLeft, ArrowRight } from '../svg-const/svg-const';
import { DEFAULT_SPETIAL_OEFFERS_COUNT, DEFAULT_SPETIAL_OEFFERS_COUN_MAX, trainingCardsImage } from '../../common/constant';
import {Training} from '../../types/training';
import AnnounceSpec from '../announce-spec/announce-spec';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../common/const';

function SpecialForYou():JSX.Element{
  const navigate = useNavigate();
  const recomendTrainnig = useAppSelector(getRecomendationTrainingList);
  const [showedTraningsCount, setShowedTraningsCount] = useState(0);


type SpecialOfferCardProps = {
  card: Training;
}
function SpecialOfferCard({card}:SpecialOfferCardProps):JSX.Element {
  const {backgroundPicture, typeOfTraining} = card;
  return(
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <source type="image/webp" srcSet={`/${backgroundPicture}.webp, /${backgroundPicture}@2x.webp 2x`}/>
            <img src={`/${backgroundPicture}.jpg`} srcSet={`/${backgroundPicture}@2x.jpg 2x`} width="452" height="191" alt=""/>
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{trainingCardsImage.find((item) => item.nameCyr === typeOfTraining)?.name}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <button
              className="btn btn--small thumbnail-preview__button"
              onClick={() => navigate(AppRoute.Main)}
            >Подробнее
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
return(
  <section className="special-for-you">
    <div className="container">
      <div className="special-for-you__wrapper">
        <div className="special-for-you__title-wrapper">
          <h2 className="special-for-you__title">Специально подобрано для вас</h2>
          <div className="special-for-you__controls">
            <button
              className="btn-icon special-for-you__control"
              type="button"
              aria-label="previous"
              onClick={() => {if (recomendTrainnig && showedTraningsCount !== 0) {setShowedTraningsCount(showedTraningsCount - 1);}}}
            >
              <svg width="16" height="14" aria-hidden="true">
                <ArrowLeft/>
              </svg>
            </button>
            <button
              className="btn-icon special-for-you__control"
              type="button"
              aria-label="next"
              onClick={() => {if (recomendTrainnig && showedTraningsCount !== DEFAULT_SPETIAL_OEFFERS_COUN_MAX && showedTraningsCount !== recomendTrainnig.length - DEFAULT_SPETIAL_OEFFERS_COUNT) {setShowedTraningsCount(showedTraningsCount + 1);}}}
            >
              <svg width="16" height="14" aria-hidden="true">
                <ArrowRight/>
              </svg>
            </button>
          </div>
        </div>
        <ul className="special-for-you__list">
          {recomendTrainnig.length ? recomendTrainnig.slice(showedTraningsCount, showedTraningsCount + DEFAULT_SPETIAL_OEFFERS_COUNT).map((item: Training) => <SpecialOfferCard card={item} key={item.trainingId}/>) : <AnnounceSpec/>}
        </ul>
      </div>
    </div>
  </section>);
}

export default SpecialForYou;
