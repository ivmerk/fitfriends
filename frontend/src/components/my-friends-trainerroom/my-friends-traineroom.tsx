import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../svg-const/svg-const';
import FriendCard from '../friend-card/friend-card';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFriends, getPersonalOrdersList } from '../../store/api-action';
import { getIsLoadingComplete, getUserFriends } from '../../store/user-data/selectors';
import { User } from '../../types/user';
import { DEFAULT_SCREEN_ITEMS_COUNT } from '../../common/constant';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function MyFriendsTrainerroom():JSX.Element{

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const friends = useAppSelector<User[]>(getUserFriends);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const [friendsOnScreenCount, setFriendsOnScreenCount] = useState(DEFAULT_SCREEN_ITEMS_COUNT);

  function ShowMoreButton():JSX.Element{
    return(
      <button
        className="btn show-more__button show-more__button--more"
        type="button"
        onClick={() =>{setFriendsOnScreenCount(friendsOnScreenCount + DEFAULT_SCREEN_ITEMS_COUNT);}}
      >Показать еще
      </button>
    );
  }
  useEffect(() =>{
    dispatch(getFriends());
    dispatch(getPersonalOrdersList());
  }, []);

  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}
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
              {friends ? friends.slice(0, friendsOnScreenCount).map((friend) => <FriendCard card={friend} key={friend.userId}/>) : ''}
            </ul>
            <div className="show-more friends-list__show-more">
              {friends.length > friendsOnScreenCount ? <ShowMoreButton/> : ''}
            </div>
          </div>
        </div>
      </section>
    </main>);
}

export default MyFriendsTrainerroom;
