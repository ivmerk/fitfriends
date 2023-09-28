import { Link } from 'react-router-dom';
import AnnounceSpec from '../announce-spec/announce-spec';
import { IconFriend, IconShoppingCart } from '../svg-const/svg-const';
import { AppRoute } from '../../common/const';
import { getIsLoadingComplete, getLoggedUser } from '../../store/user-data/selectors';
import { useAppSelector } from '../../hooks';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { DAYS_IN_WEEK_QTT } from '../../common/constant';
import ClientInfo from '../client-info/client-info';

function ClientRoomInfo ():JSX.Element{
  const user = useAppSelector(getLoggedUser);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  if (!isLoadingComplete && !user){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}
  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>
            <ClientInfo/>
            <div className="inner-page__content">
              <div className="personal-account-user">
                <div className="personal-account-user__schedule">
                  <div className="personal-account-user__form">
                    <div className="personal-account-user__input">
                      <label><span className="personal-account-user__label">План на день, ккал</span>
                        <input
                          type="text"
                          name="schedule-for-the-day"
                          defaultValue={user?.clientBody?.caloryLosingPlanDaily}
                        />
                      </label>
                    </div>
                    <div className="personal-account-user__input">
                      <label><span className="personal-account-user__label">План на неделю, ккал</span>
                        <input
                          type="text"
                          name="schedule-for-the-week"
                          defaultValue={user?.clientBody?.caloryLosingPlanDaily ? user?.clientBody?.caloryLosingPlanDaily * DAYS_IN_WEEK_QTT : ''}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="personal-account-user__additional-info">
                  <Link to={`${AppRoute.ClientRoom}/${AppRoute.MyFriends}`} className="thumbnail-link thumbnail-link--theme-light">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <IconFriend/>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои друзья</span>
                  </Link>
                  <Link to={`${AppRoute.ClientRoom}/${AppRoute.MyPurchases}`} className="thumbnail-link thumbnail-link--theme-light">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <IconShoppingCart/>
                      </svg>
                    </div><span className="thumbnail-link__text">Мои покупки</span>
                  </Link>
                  <AnnounceSpec/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ClientRoomInfo;
