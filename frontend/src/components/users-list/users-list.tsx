import { DEFAULT_CARDS_COUNT } from '../../common/constant';
import { useAppSelector } from '../../hooks';
import { getUsers } from '../../store/user-data/selectors';
import { ShowMoreButton } from '../show-more-button/show-more-button';
import UserCard from '../user-card/user-card';

function UsersList():JSX.Element{
  const userList = useAppSelector(getUsers);
  return(
    <div className="users-catalog">
      <ul className="users-catalog__list">
        {userList ? userList.map((card)=>(<UserCard card={card} key={card.userId}/>)) : ''}
      </ul>
      {(userList.length === DEFAULT_CARDS_COUNT) ? <ShowMoreButton/> : ''}
    </div>
  );
}
export default UsersList;
