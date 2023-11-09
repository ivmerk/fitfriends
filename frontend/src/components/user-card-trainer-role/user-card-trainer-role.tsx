import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFriend, delFriend } from '../../store/api-action';
import { getUserFriends } from '../../store/user-data/selectors';
import { User } from '../../types/user';
import { IconCup, IconLocation, IconTeacher } from '../svg-const/svg-const';
import TrainerCardTrainingList from '../trainer-card-training-list/trainer-card-training-list';

type UserCardTrainerRolePropes ={
  card: User;
}

function UserCardTrainerRole({card}: UserCardTrainerRolePropes):JSX.Element {
  const dispatch = useAppDispatch();
  const{userName, location, typesOfTraining, description, userId, trainerBody} = card;
  const friendsList = useAppSelector(getUserFriends);
  type TypeItemPropes = {
    type: string;
  }


  function TypeItem({type}:TypeItemPropes):JSX.Element{
    return(
      <li className="user-card__hashtag-item">
        <div className="hashtag"><span>#{type}</span></div>
      </li>
    );
  }

  function AddFriendButton():JSX.Element{
    if(friendsList?.find((item) => item.friendId === card.userId && item.isConfirmed === true)) {
      return (
        <button
          className="btn user-card__btn btn btn--outlined"
          type="button"
          onClick={() => {if(userId){dispatch(delFriend(userId));}}}
        >
  Исключить из друзей
        </button>);
    } else if ((friendsList?.find((item) => item.friendId === card.userId && item.isConfirmed === false))) {return (
      <button
        className="btn user-card__btn"
        type="button"
      >
  Заявка на рассморении
      </button>
    );} else {
      return (
        <button
          className="btn user-card__btn"
          type="button"
          onClick={() => {if(userId){dispatch(addFriend(userId));}}}
        >Добавить в друзья
        </button>
      );}}

  return(
    <section className="user-card-coach">
      <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
      <div className="user-card-coach__wrapper">
        <div className="user-card-coach__card">
          <div className="user-card-coach__content">
            <div className="user-card-coach__head">
              <h2 className="user-card-coach__title">{userName}</h2>
            </div>
            <div className="user-card-coach__label">
              <a href="popup-user-map.html">
                <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                  <IconLocation/>
                </svg>
                <span>{location}</span>
              </a>
            </div>
            <div className="user-card-coach__status-container">
              <div className="user-card-coach__status user-card-coach__status--tag">
                <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                  <IconCup/>
                </svg><span>Тренер</span>
              </div>
              <div
                className={trainerBody?.readinessForPrivate ? 'user-card-coach__status user-card-coach__status--check' : 'user-card-coach-2__status user-card-coach-2__status--check'}
              >
                <span>
                  {trainerBody?.readinessForPrivate ? 'Готов тренировать' : 'Не готов тренировать'}
                </span>
              </div>
            </div>
            <div className="user-card-coach__text">
              {description}
            </div>
            <button className="btn-flat user-card-coach__sertificate" type="button">
              <svg width="12" height="13" aria-hidden="true">
                <IconTeacher/>
              </svg><span>Посмотреть сертификаты</span>
            </button>
            <ul className="user-card-coach__hashtag-list">
              {typesOfTraining.map((type) => (<TypeItem type={type} key={type}/>))}
            </ul>
            <AddFriendButton/>
          </div>
          <div className="user-card-coach__gallary">
            <ul className="user-card-coach__gallary-list">
              <li className="user-card-coach__gallary-item">
                <img src="/img/content/user-coach-photo1.jpg" srcSet="/img/content/user-coach-photo1@2x.jpg 2x" width="334" height="573" alt="photo1"/>
              </li>
              <li className="user-card-coach__gallary-item">
                <img src="/img/content/user-coach-photo2.jpg" srcSet="/img/content/user-coach-photo2@2x.jpg 2x" width="334" height="573" alt="photo2"/>
              </li>
            </ul>
          </div>
        </div>
        <TrainerCardTrainingList/>
      </div>
    </section>

  );
}
export default UserCardTrainerRole;
