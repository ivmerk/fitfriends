import MyTrainingFilter from './my-training-filter/my-training-filter';
import MyTrainingList from './my-training-list/my-training-list';


function MyTrainingListBlock():JSX.Element{


  return(
    <div className="inner-page__wrapper">
      <h1 className="visually-hidden">Мои тренировки</h1>
      <MyTrainingFilter/>
      <div className="inner-page__content">
        <MyTrainingList/>
      </div>
    </div>
  );
}

export default MyTrainingListBlock;
