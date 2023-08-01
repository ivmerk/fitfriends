import Header from '../../components/header/header';
import TrainerNavigationList from '../../components/trainer-navigation-list/trainer-navigation-list';
import TrainersDiplomsBlock from '../../components/trainers-diploms-block/trainers-diploms-block';
import UserInfo from '../../components/user-info/user-info';

function TrainerRoomScreen():JSX.Element{
  return(
    <>
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfo/>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <TrainerNavigationList/>
                  <TrainersDiplomsBlock/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TrainerRoomScreen;
