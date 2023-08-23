import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../svg-const/svg-const';
import FriendCard from '../friend-card/friend-card';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFriends, getPersonalOrdersList } from '../../store/api-action';
import { getUserFriends } from '../../store/user-data/selectors';
import { User } from '../../types/user';

function MyFriendsTrainerroom():JSX.Element{

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const friends = useAppSelector<User[]>(getUserFriends);

  useEffect(() =>{
    dispatch(getFriends());
    dispatch(getPersonalOrdersList());
  }, []);
  return(
    <main>
      <section className="friends-list">
        <div className="container">
          <div className="friends-list__wrapper">
            <button
              className="btn-flat friends-list__back"
              type="button"
              onClick={()=>navigate(-1)}
            >
              <svg width="14" height="10" aria-hidden="true">
                <ArrowLeft/>
              </svg><span>Назад</span>
            </button>
            <div className="friends-list__title-wrapper">
              <h1 className="friends-list__title">Мои друзья</h1>
            </div>
            <ul className="friends-list__list">
              {friends.map((friend) => <FriendCard card={friend} key={friend.userId}/>)}
            </ul>
            <div className="show-more friends-list__show-more">
              <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
              <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
            </div>
          </div>
        </div>
      </section>
    </main>);
}

export default MyFriendsTrainerroom;
