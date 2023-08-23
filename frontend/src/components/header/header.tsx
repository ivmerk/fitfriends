import { useNavigate } from 'react-router-dom';
import MainNav from '../main-nav/main-nav';
import Search from '../search/search';
import { HeaderLogo } from '../svg-const/svg-const';
import { AppRoute } from '../../common/const';

function Header():JSX.Element{
  const navigate = useNavigate();
  return(

    <header className="header">
      <div className="container">
        <div className="header__logo"
          onClick={() => navigate(AppRoute.Intro)}
        >
          <HeaderLogo/>
        </div>
        <MainNav/>
        <Search/>
      </div>
    </header>
  );
}
export default Header;
