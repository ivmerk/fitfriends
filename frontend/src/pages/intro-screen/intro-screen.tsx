import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../common/const';
import { AUTH_TOKEN_KEY_NAME } from '../../common/constant';
import { IntroIcon } from '../../components/svg-const/svg-const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthAction } from '../../store/api-action';
import { getAuthorizationStatus, getIsLoadingComplete, getIsLoggingComplete, getLoggedUserRole } from '../../store/user-data/selectors';
import { UserRole } from '../../types/user-role.enum';
import LoadingScreen from '../loading-screen/loading-screen';

function IntroScreen() :JSX.Element {

  const dispatch = useAppDispatch();
  const isLoadingCompelete = useAppSelector(getIsLoadingComplete);
  const isLoggingComplete = useAppSelector(getIsLoggingComplete);
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const loggedUserRole = useAppSelector(getLoggedUserRole);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggingComplete) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(checkAuthAction());
      }
    };
    fetchData();
  }, [isLoggingComplete, token, dispatch]);

  useEffect(() => {
    if(authorizationStatus === AuthorizationStatus.Auth){
      loggedUserRole === UserRole.Trainer ? navigate(AppRoute.TrainerRoom) : navigate(AppRoute.Main);
      console.log(authorizationStatus);

      console.log(loggedUserRole);
    }
  },[authorizationStatus]);

  if (!isLoadingCompelete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}

  return(
    <div className="intro">
      <div className="intro__background">
        <picture>
          <source type="image/webp" srcSet="img/content/sitemap//background.webp, img/content/sitemap//background@2x.webp 2x"></source>
          <img src="img/content/sitemap//background.jpg" srcSet="img/content/sitemap//background@2x.jpg 2x" width="1440" height="1024" alt="Фон с бегущей девушкой"></img>
        </picture>
      </div>
      <div className="intro__wrapper">
        <IntroIcon/>
        <div className="intro__title-logo">
          <picture>
            <source type="image/webp" srcSet="img/content/sitemap//title-logo.webp, img/content/sitemap//title-logo@2x.webp 2x"></source>
            <img src="img/content/sitemap//title-logo.png" srcSet="img/content/sitemap//title-logo@2x.png 2x" width="934" height="455" alt="Логотип Fit Friends"></img>
          </picture>
        </div>
        <div className="intro__buttons">
          <Link className="btn intro__button"
            type="button"
            to ="/registration"
          >
            Регистрация
          </Link>
          <p className="intro__text">
            Есть аккаунт?
            <Link className='intro__link'
              to="/login"
            >
              Вход
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default IntroScreen;
