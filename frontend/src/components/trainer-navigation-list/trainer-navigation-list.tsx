import { Link } from 'react-router-dom';
import { IconAdd, IconBag, IconFlash, IconFriend } from '../svg-const/svg-const';
import { AppRoute } from '../../const';
import AnnounceSpec from '../announce-spec/announce-spec';

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
      <Link to={`${AppRoute.TrainerRoom}/${AppRoute.NewTraining}`} className="thumbnail-link thumbnail-link--theme-light">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <IconAdd/>
          </svg>
        </div><span className="thumbnail-link__text">Создать тренировку</span>
      </Link>
      <Link to={`${AppRoute.TrainerRoom}/${AppRoute.MyFriendsTrainer}`} className="thumbnail-link thumbnail-link--theme-light">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <IconFriend/>
          </svg>
        </div><span className="thumbnail-link__text">Мои друзья</span>
      </Link>
      <Link to={`${AppRoute.TrainerRoom}/${AppRoute.MyOrdersTrainer}`} className="thumbnail-link thumbnail-link--theme-light">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <IconBag/>
          </svg>
        </div><span className="thumbnail-link__text">Мои заказы</span>
      </Link>
      <AnnounceSpec/>
    </div>
  );
}
export default TrainerNavigationList;

