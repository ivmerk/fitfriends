import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFriend, delFriend } from '../../store/api-action';
import { getLoggedUserRole, getUserFriends } from '../../store/user-data/selectors';
import { User } from '../../types/user';
import { UserRole } from '../../types/user-role.enum';
import { IconLocation } from '../svg-const/svg-const';

type UserCardClientRolePrope = {
  card: User;
}

function UserCardClientRole({card}:UserCardClientRolePrope):JSX.Element{
  const dispatch = useAppDispatch();
  const friendsList = useAppSelector(getUserFriends);
  const userRole = useAppSelector(getLoggedUserRole);

  const {userName, location, clientBody, description, typesOfTraining, userId } = card;

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

  return(
    <section className="user-card">
      <h1 className="visually-hidden">Карточка пользователя</h1>
      <div className="user-card__wrapper">
        <div className="user-card__content">
          <div className="user-card__head">
            <h2 className="user-card__title">{userName}</h2>
          </div>
          <div className="user-card__label">
            <a href="">
              <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                <IconLocation/>
              </svg><span>{location}</span>
            </a>
          </div>
          {clientBody?.readinessForTraining ? (
            <div className="user-card__status">
              <span>Готов к тренировке</span>
            </div>) : ''}
          <div className="user-card__text">
            <p>{description}</p>
          </div>
          <ul className="user-card__hashtag-list">
            {typesOfTraining.map((type) => (<TypeItem type={type} key={type}/>))}
          </ul>
          {friendsList?.find((item) => item.friendId === userId) ?
            (
              <button
                className="btn user-card__btn"
                type="button"
                onClick={() => {if(userId ){dispatch(delFriend(userId));}}}
              >
            Исключить из друзей
              </button>) :
            (
              <button
                className="btn user-card__btn"
                type="button"
                onClick={() => {if(userId && userRole === UserRole.Client){dispatch(addFriend(userId));}}}
              >Добавить в друзья
              </button>)}
        </div>
        <div className="user-card__gallary">
          <ul className="user-card__gallary-list">
            <li className="user-card__gallary-item"><img src="/img/content/user-card-photo1.jpg" srcSet="/img/content/user-card-photo1@2x.jpg 2x" width="334" height="573" alt="photo1"/>
            </li>
            <li className="user-card__gallary-item"><img src="/img/content/user-card-photo2.jpg" srcSet="/img/content/user-card-photo2@2x.jpg 2x" width="334" height="573" alt="photo2"/>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );}
export default UserCardClientRole;
