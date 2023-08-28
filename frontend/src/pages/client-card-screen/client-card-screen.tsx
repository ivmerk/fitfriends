import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getFriends, getUserById } from '../../store/api-action';
import { getIsDeletingComplete, getIsLoadingComplete, getUserCard } from '../../store/user-data/selectors';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../loading-screen/loading-screen';
import { ArrowLeft } from '../../components/svg-const/svg-const';
import { UserRole } from '../../types/user-role.enum';
import UserCardClientRole from '../../components/user-card-client-role/user-card-client-role';
import UserCardTrainerRole from '../../components/user-card-trainer-role/user-card-trainer-role';

function ClientCardScreen():JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserCard);

  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const isDeletingComplete = useAppSelector(getIsDeletingComplete);
  const userId = params.id;
  const navigate = useNavigate();

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
                {user.userRole === UserRole.Client ? <UserCardClientRole card={user}/> : <UserCardTrainerRole card={user}/>}

              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ClientCardScreen;
