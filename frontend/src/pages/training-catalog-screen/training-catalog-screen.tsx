import Header from '../../components/header/header';
import TrainingsCatalogFilter from '../../components/training-catalog-blocks/training-catalog-filter/training-catalog-filter';
import TrainingCatalogList from '../../components/training-catalog-blocks/training-catalog-list/training-catalog-list';

function TrainingsCatalogScreen ():JSX.Element{


  return(
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <TrainingsCatalogFilter/>
              <TrainingCatalogList/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TrainingsCatalogScreen;
