import { hostPort } from '../../common/constant';
import { capitalizeFirst } from '../../common/utils';
import { User } from '../../types/user';

type FriendCardPropes = {
  item: User;
}

function FriendCard({item} :FriendCardPropes):JSX.Element{
  const {userName, location, typesOfTraining, clientBody, userAvatar} = item;
  return(
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                {userAvatar ? <img src={`${hostPort}${userAvatar}`} srcSet={`${hostPort}${userAvatar} 2x`} width="78" height="78" alt="user"/> : ''}
              </picture>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{userName}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">{capitalizeFirst(location)}</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {typesOfTraining.map((type) =>(
              <li key={type}>
                <div className="hashtag thumbnail-friend__hashtag">
                  <span>#{type}</span>
                </div>
              </li>))}
          </ul>
          <div className="thumbnail-friend__activity-bar">
            {clientBody?.readinessForTraining ?
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                <span>Готов к тренировке</span>
              </div> :
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                <span>Не готов к тренировке</span>
              </div>}
          </div>
        </div>
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
          <div className="thumbnail-friend__button-wrapper">
            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
          </div>
        </div>
      </div>
    </li>
  );
}
export default FriendCard;
