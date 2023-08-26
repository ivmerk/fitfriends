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
import { getRecomendationTrainings, getUserById, getUserList } from '../../store/api-action';
import { DEFAULT_CARDS_COUNT } from '../../common/constant';
import { levelsOfExperience, userLocations } from '../../common/constant.user';
import { typesOfTraining } from '../../common/constant.training';

function MainScreen(): JSX.Element{
  const dispatch = useAppDispatch();
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const userId = useAppSelector(getLoggedUserId);

  useEffect(()=>{
    if(userId){
      dispatch(getUserById(userId.toString()));
      dispatch(getRecomendationTrainings());
      dispatch(getUserList({
        limit: DEFAULT_CARDS_COUNT,
        page: 1,
        locations:userLocations.join(','),
        levelOfExperience: levelsOfExperience[0],
        typesOfTraining:typesOfTraining.join(','),
      }));
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
