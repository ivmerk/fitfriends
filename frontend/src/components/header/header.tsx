import HeaderLogo from '../hearder-logo/header-logo';
import MainNav from '../main-nav/main-nav';
import Search from '../search/search';

function Header():JSX.Element{
  return(

    <header className="header">
      <div className="container">
        <HeaderLogo/>
        <MainNav/>
        <Search/>
      </div>
    </header>
  );
}
export default Header;
