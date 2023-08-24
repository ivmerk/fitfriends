import { HelmetProvider } from 'react-helmet-async';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsLoadingComplete, getLoggedUser, getLoggedUserId } from '../../store/user-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { getUserById } from '../../store/api-action';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function TrainerRoomScreen():JSX.Element{
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getLoggedUserId);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const user = useAppSelector(getLoggedUser);

  useEffect(()=>{
    if(userId){
      dispatch(getUserById(userId));
    }
  }, []);

  if (!isLoadingComplete && !user){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}

  return(
    <>
      <Header/>
      <Outlet/>
    </>
  );
}

export default TrainerRoomScreen;
