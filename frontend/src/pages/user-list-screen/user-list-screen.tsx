import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import UserListFilter from '../../components/user-list-filter/user-list-filter';
import UsersList from '../../components/users-list/users-list';

function UserListScreen():JSX.Element{

  return(
    <>
      <Helmet>
        <title>FitFriends - User Catalog</title>
      </Helmet>
      <div className="wrapper">
        <Header/>
        <main>
          <section className="inner-page">
            <div className="container">
              <div className="inner-page__wrapper">
                <h1 className="visually-hidden">Каталог пользователей</h1>
                <UserListFilter/>
                <div className="inner-page__content">
                  <UsersList/>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default UserListScreen;
