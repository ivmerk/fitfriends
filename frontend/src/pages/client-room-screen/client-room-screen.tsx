import { useEffect } from 'react';
import AnnounceSpec from '../../components/announce-spec/announce-spec';
import Header from '../../components/header/header';
import { IconFriend, IconShoppingCart } from '../../components/svg-const/svg-const';
import UserInfo from '../../components/user-info/user-info';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsLoadingComplete, getLoggedUser, getLoggedUserId } from '../../store/user-data/selectors';
import { getMyFriendsCards, getUserById } from '../../store/api-action';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../loading-screen/loading-screen';

function ClientRoomScreen():JSX.Element{
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getLoggedUserId);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const user = useAppSelector(getLoggedUser);

  useEffect(()=>{
    if(userId){
      dispatch(getUserById(userId.toString()));
      dispatch(getMyFriendsCards());
    }
  }, []);

  if (!isLoadingComplete && !user){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}
  return(
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfo/>
              <div className="inner-page__content">
                <div className="personal-account-user">
                  <div className="personal-account-user__schedule">
                    <form action="#" method="get">
                      <div className="personal-account-user__form">
                        <div className="personal-account-user__input">
                          <label><span className="personal-account-user__label">План на день, ккал</span>
                            <input type="text" name="schedule-for-the-day" value="3 300"/>
                          </label>
                        </div>
                        <div className="personal-account-user__input">
                          <label><span className="personal-account-user__label">План на неделю, ккал</span>
                            <input type="text" name="schedule-for-the-week" value="23 100"/>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="personal-account-user__additional-info">
                    <a className="thumbnail-link thumbnail-link--theme-light">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconFriend/>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </a>
                    <a className="thumbnail-link thumbnail-link--theme-light">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconShoppingCart/>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои покупки</span>
                    </a>
                    <AnnounceSpec/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

  );
}
export default ClientRoomScreen;
