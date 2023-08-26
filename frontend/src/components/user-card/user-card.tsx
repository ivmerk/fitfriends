import { useNavigate } from 'react-router-dom';
import { HOST_PORT } from '../../common/constant';
import { User } from '../../types/user';
import { UserRole } from '../../types/user-role.enum';
import { IconLocation } from '../svg-const/svg-const';
import { getUserCardAppUrlByID } from '../../common/geturl';

type UserCardProps = {
  card:User;
}

function UserCard({card}:UserCardProps):JSX.Element {
  const navigate = useNavigate();
  const{userName, location, userRole, typesOfTraining, userAvatar, userId} = card;

  type TypeItemPropes = {
    type: string;
  }
  function TypeItem({type}:TypeItemPropes):JSX.Element{
    return(
      <li className="thumbnail-user__hashtags-item">
        <div className="hashtag thumbnail-user__hashtag"><span>#{type}</span></div>
      </li>
    );
  }

  return (
    <li className="users-catalog__item">
      <div
        className={userRole === UserRole.Client ? 'thumbnail-user thumbnail-user--role-user' : 'thumbnail-user thumbnail-user--role-coach'}
      >
        <div className="thumbnail-user__image">
          <picture>
            <img src={`${HOST_PORT}${userAvatar}`} srcSet={`${HOST_PORT}${userAvatar} 2x`} width="82" height="82" alt="user"/>
          </picture>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{userName}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <IconLocation/>
            </svg>
            <address className="thumbnail-user__location-address">{location}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {typesOfTraining.map((type) => (<TypeItem type={type} key={type}/>))}
        </ul>
        {userId ?
          <div
            className="btn btn--medium thumbnail-user__button"
            onClick={() => {navigate(getUserCardAppUrlByID(userId.toString()));}}
          >Подробнее
          </div> : ''}
      </div>
    </li>
  );
}

export default UserCard;
