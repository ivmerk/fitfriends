import { HelmetProvider } from 'react-helmet-async';
import Header from '../../components/header/header';
import TrainerNavigationList from '../../components/trainer-navigation-list/trainer-navigation-list';
import TrainersDiplomsBlock from '../../components/trainers-diploms-block/trainers-diploms-block';
import UserInfo from '../../components/user-info/user-info';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsLoadingComplete, getLoggedUser, getLoggedUserId } from '../../store/user-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { getUserById } from '../../store/api-action';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NewTrainingForm from '../../components/new-training-form/new-training-form';

function TrainerRoomScreen():JSX.Element{
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getLoggedUserId);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const user = useAppSelector(getLoggedUser);

  useEffect(()=>{
    if(userId){
      dispatch(getUserById(userId));
    }
  }, [dispatch, userId]);

  if (!isLoadingComplete && !user){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}


  function TrainersInfoComponent ():JSX.Element {
    return (
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper"></div>
            <h1 className="visually-hidden">Личный кабинет</h1>
            <UserInfo/>
            <div className="inner-page__content">
              <div className="personal-account-coach">
                <TrainerNavigationList/>
                <TrainersDiplomsBlock/>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
  return(
    <>
      <Header/>
      <Routes>
        <Route path='*' element={<TrainersInfoComponent/>}/>
        <Route path='newtraining' element={<NewTrainingForm/>}/>
      </Routes>
    </>
  );
}

export default TrainerRoomScreen;
