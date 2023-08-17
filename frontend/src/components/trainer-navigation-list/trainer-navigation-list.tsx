import { Link } from 'react-router-dom';
import { IconAdd, IconBag, IconFlash, IconFriend } from '../svg-const/svg-const';
import { AppRoute } from '../../const';

function TrainerNavigationList():JSX.Element{
  return(
    <div className="personal-account-coach__navigation">
      <Link to={`${AppRoute.TrainerRoom}/${AppRoute.MyTrainings}`} className="thumbnail-link thumbnail-link--theme-light">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <IconFlash/>
          </svg>
        </div><span className="thumbnail-link__text">Мои тренировки</span>
      </Link>
      <Link to="/trainerroom/newtraining" className="thumbnail-link thumbnail-link--theme-light">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <IconAdd/>
          </svg>
        </div><span className="thumbnail-link__text">Создать тренировку</span>
      </Link>
      <a className="thumbnail-link thumbnail-link--theme-light" href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <IconFriend/>
          </svg>
        </div><span className="thumbnail-link__text">Мои друзья</span>
      </a>
      <a className="thumbnail-link thumbnail-link--theme-light" href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <IconBag/>
          </svg>
        </div><span className="thumbnail-link__text">Мои заказы</span>
      </a>
      <div className="personal-account-coach__calendar">
        <div className="thumbnail-spec-gym">
          <div className="thumbnail-spec-gym__image">
            <picture>
              <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"></source>
              <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""></img>
            </picture>
          </div>
          <div className="thumbnail-spec-gym__header" >
            <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TrainerNavigationList;

