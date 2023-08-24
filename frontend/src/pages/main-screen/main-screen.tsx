import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../../components/header/header';
import LookForCompany from '../../components/look-for-company/look-for-company';
import PopularTrainings from '../../components/popular-trainings/popular-trainings';
import SpecialForYou from '../../components/special-for-you/special-for-you';
import SpecialOffers from '../../components/special-offers/special-offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsLoadingComplete, getLoggedUserId } from '../../store/user-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect } from 'react';
import { getRecomendationTrainings, getUserById } from '../../store/api-action';

function MainScreen(): JSX.Element{
  const dispatch = useAppDispatch();
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const userId = useAppSelector(getLoggedUserId);

  useEffect(()=>{
    if(userId){
      dispatch(getUserById(userId));
      dispatch(getRecomendationTrainings());
    }
  }, [dispatch, userId]);

  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}
  return(
    <>
      <Helmet>
        <title>FitFriends - Main</title>
      </Helmet>
      <Header/>
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <SpecialForYou/>
        <SpecialOffers/>
        <PopularTrainings/>
        <LookForCompany/>
      </main>
    </>
  );}

export default MainScreen;
