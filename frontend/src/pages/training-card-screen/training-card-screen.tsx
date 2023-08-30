import Header from '../../components/header/header';
import RewiewsSideList from '../../components/rewiews-side-list/rewiews-side-list';
import TrainingCardTrainerRole from '../../components/training-card-trainer-role/training-card-trainer-role';
import { useAppSelector } from '../../hooks';
import { getLoggedUserRole } from '../../store/user-data/selectors';
import { UserRole } from '../../types/user-role.enum';

function TrainingCardScreen():JSX.Element{
  const userRole = useAppSelector(getLoggedUserRole);
  return(
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button">
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg><span>Назад</span>
                </button>
                <h2 className="reviews-side-bar__title">Отзывы</h2>
                <RewiewsSideList/>
                <button className="btn btn--medium reviews-side-bar__button" type="button" disabled>Оставить отзыв</button>
              </aside>
              {userRole === UserRole.Trainer ? <TrainingCardTrainerRole/> : ''}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TrainingCardScreen;
