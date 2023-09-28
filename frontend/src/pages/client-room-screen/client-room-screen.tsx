import { useEffect } from 'react';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsLoadingComplete, getLoggedUser, getLoggedUserId } from '../../store/user-data/selectors';
import { getMyFriendsCards, getUserById } from '../../store/api-action';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../loading-screen/loading-screen';
import { Outlet } from 'react-router-dom';

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
    <>
      <Helmet>
        <title>FitFriends - Users Room</title>
      </Helmet>
      <div className="wrapper">
        <Header/>
        <Outlet/>
      </div>
    </>
  );
}
export default ClientRoomScreen;
