import { OrdersCondition, HOST_PORT} from '../../common/constant';
import { capitalizeFirst } from '../../common/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getTrainingPersonalOrderList } from '../../store/user-data/selectors';
import { PersonalOrderTraining } from '../../types/personal-order-training';
import { User } from '../../types/user';
import { IconLocation } from '../svg-const/svg-const';
import { getPersonalOrderAprooving } from '../../store/api-action';
import { UserRole } from '../../types/user-role.enum';

type FriendCardPropes = {
  card: User;
}

function FriendCard({card} :FriendCardPropes):JSX.Element{
  const dispatch = useAppDispatch();

  const {userName, location, typesOfTraining, clientBody, userAvatar, userId, userRole} = card;
  const trainings = useAppSelector<PersonalOrderTraining[]>(getTrainingPersonalOrderList);
  const personalTraining = trainings.find((item) => item.userId === userId);

  function PersonalTrainingMenu():JSX.Element{
    return(
      <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
        <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
        <div className="thumbnail-friend__button-wrapper">
          <button
            className="btn btn--medium btn--dark-bg thumbnail-friend__button"
            type="button"
            onClick={() => {if(personalTraining){dispatch(getPersonalOrderAprooving(
              {orderId: personalTraining.personalOrderTrainingId,newStatus: OrdersCondition.Aprooved }
            ));}}}
          >Принять
          </button>
          <button
            className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
            type="button"
            onClick={() => {if(personalTraining){dispatch(getPersonalOrderAprooving(
              {orderId: personalTraining.personalOrderTrainingId,newStatus: OrdersCondition.Rejected}
            ));}}}
          >Отклонить
          </button>
        </div>
      </div>
    );
  }

  return(
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className={`thumbnail-friend__info thumbnail-friend__info--theme-${userRole === UserRole.Client ? 'light' : 'dark'}`}>

          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                {userAvatar ? <img src={`${HOST_PORT}${userAvatar}`} srcSet={`${HOST_PORT}${userAvatar} 2x`} width="78" height="78" alt="user"/> : ''}
              </picture>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{userName}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <IconLocation/>
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
        {personalTraining?.orderCondition === OrdersCondition.Waiting ? <PersonalTrainingMenu/> : ''}
      </div>
    </li>
  );
}
export default FriendCard;
