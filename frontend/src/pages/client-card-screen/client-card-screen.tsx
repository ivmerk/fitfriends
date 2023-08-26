import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { addFriend, delFriend, getFriends, getUserById } from '../../store/api-action';
import { getIsDeletingComplete, getIsLoadingComplete, getUserCard, getUserFriends } from '../../store/user-data/selectors';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../loading-screen/loading-screen';
import { ArrowLeft, IconLocation } from '../../components/svg-const/svg-const';

function ClientCardScreen():JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserCard);
  const friendsList = useAppSelector(getUserFriends);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const isDeletingComplete = useAppSelector(getIsDeletingComplete);
  const userId = params.id;
  const navigate = useNavigate();


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

  useEffect(() => {
    if(userId){
      dispatch(getUserById(userId));
      dispatch(getFriends());}
  }
  ,[]);

  useEffect(() => {
    if(isDeletingComplete){
      dispatch(getFriends());
    }
  }, [isDeletingComplete]);

  if (!user || ! isLoadingComplete) {
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>
    );
  }
  return(
    <>
      <Helmet>
        <title>FitFriends - Users Card</title>
      </Helmet>
      <header className="header">
        <Header/>
      </header>
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button
                className="btn-flat inner-page__back"
                type="button"
                onClick={()=>navigate(-1)}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <ArrowLeft/>
                </svg><span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="user-card">
                  <h1 className="visually-hidden">Карточка пользователя</h1>
                  <div className="user-card__wrapper">
                    <div className="user-card__content">
                      <div className="user-card__head">
                        <h2 className="user-card__title">{user?.userName}</h2>
                      </div>
                      <div className="user-card__label">
                        <a href="">
                          <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                            <IconLocation/>
                          </svg><span>{user?.location}</span>
                        </a>
                      </div>
                      {user?.clientBody?.readinessForTraining ? (
                        <div className="user-card__status">
                          <span>Готов к тренировке</span>
                        </div>) : ''}
                      <div className="user-card__text">
                        <p>{user?.description}</p>
                      </div>
                      <ul className="user-card__hashtag-list">
                        {user.typesOfTraining.map((type) => (<TypeItem type={type} key={type}/>))}
                      </ul>
                      {friendsList?.find((item) => item.userId === user.userId) ?
                        (
                          <button
                            className="btn user-card__btn"
                            type="button"
                            onClick={() => {if(userId){dispatch(delFriend(parseInt(userId, 10)));}}}
                          >
                          Исключить из друзей
                          </button>) :
                        (
                          <button
                            className="btn user-card__btn"
                            type="button"
                            onClick={() => {if(userId){dispatch(addFriend(parseInt(userId, 10)));}}}
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ClientCardScreen;
