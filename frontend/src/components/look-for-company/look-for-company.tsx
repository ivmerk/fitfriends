import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, IconCrown, IconLocation } from '../svg-const/svg-const';
import { AppRoute } from '../../common/const';
import { useAppSelector } from '../../hooks';
import { getIsLoadingComplete, getUsers } from '../../store/user-data/selectors';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useState } from 'react';
import { DEFAULT_MAIN_SCREEN_USERS_CARDS_COUNT, DEFAULT_MAIN_SCREEN_USERS_CARDS_COUNT_MAX, HOST_PORT } from '../../common/constant';
import { User } from '../../types/user';
import { UserRole } from '../../types/user-role.enum';
import { getUserCardAppUrlByID } from '../../common/geturl';
import AnnounceSpec from '../announce-spec/announce-spec';

function LookForCompany():JSX.Element{

  const navigate = useNavigate();
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const userList = useAppSelector(getUsers);

  const[cardsScreening, setCardsScreening] = useState(0);


  function MenuControl():JSX.Element{
    return(
      <div className="look-for-company__controls">
        <button
          className="btn-icon btn-icon--outlined look-for-company__control"
          type="button"
          aria-label="previous"
          onClick={() => {if (userList && cardsScreening !== 0) {setCardsScreening(cardsScreening - 1);}}}
        >
          <svg width="16" height="14" aria-hidden="true">
            <ArrowLeft/>
          </svg>
        </button>
        <button
          className="btn-icon btn-icon--outlined look-for-company__control"
          type="button"
          aria-label="next"
          onClick={() => {if (userList && cardsScreening !== userList.length - DEFAULT_MAIN_SCREEN_USERS_CARDS_COUNT && cardsScreening !== DEFAULT_MAIN_SCREEN_USERS_CARDS_COUNT_MAX) {setCardsScreening(cardsScreening + 1);}}}
        >
          <svg width="16" height="14" aria-hidden="true">
            <ArrowRight/>
          </svg>
        </button>
      </div>
    );
  }
  function ListMenu():JSX.Element{
    return(
      <div className="look-for-company__title-wrapper">
        <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
        <button
          className="btn-flat btn-flat--light look-for-company__button"
          type="button"
          onClick={()=>{navigate(AppRoute.UserList);}}
        ><span>Смотреть все</span>
          <svg width="14" height="10" aria-hidden="true">
            <ArrowRight/>
          </svg>
        </button>
        {userList.length > DEFAULT_MAIN_SCREEN_USERS_CARDS_COUNT ? <MenuControl/> : ''}
      </div>
    );
  }

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

  type UserCardPrope = {card:User}

  function UserCard({card}:UserCardPrope):JSX.Element{
    const {userName, location, typesOfTraining, userAvatar, userId} = card;
    return(
      <li className="look-for-company__item">
        <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
          <div className="thumbnail-user__image">
            <picture>
              <img src={`${HOST_PORT}${userAvatar}`} srcSet={`${HOST_PORT}${userAvatar} 2x`} width="82" height="82" alt="user"/>
            </picture>
          </div>
          <svg width="12" height="12" aria-hidden="true">
            <IconCrown/>
          </svg>
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

  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}


  return(
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <ListMenu/>
          <ul className="look-for-company__list">
            {userList ? userList.filter((item) => item.userRole === UserRole.Client && item.clientBody?.readinessForTraining).slice(cardsScreening, cardsScreening + DEFAULT_MAIN_SCREEN_USERS_CARDS_COUNT).map((card) => <UserCard card={card} key={card.userId}/>) : <AnnounceSpec/>}
          </ul>
        </div>
      </div>
    </section>
  );
}
export default LookForCompany;
