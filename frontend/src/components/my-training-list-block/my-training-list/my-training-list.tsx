import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../../hooks';
import TrainingCard from '../../small-training-card/small-training-card';
import LoadingScreen from '../../../pages/loading-screen/loading-screen';
import { getIsLoadingTrainingComplete, getTrainingList } from '../../../store/training-data/selector';
import { Training } from '../../../types/training';
import { ShowMoreButton } from '../../show-more-button/show-more-button';
import { getListLimit } from '../../../store/user-process/selector';


function MyTrainingList():JSX.Element{

  const trainingList = useAppSelector(getTrainingList);
  const isLoadingComplete = useAppSelector(getIsLoadingTrainingComplete);
  const listLimit = useAppSelector(getListLimit);
  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}

  return(
    <div className="my-trainings">
      <ul className="my-trainings__list">
        {(trainingList.length !== 0) ? trainingList.map((item:Training) => (<TrainingCard selectedCard={item} key={item.trainingId} />)) : ''}
      </ul>
      {trainingList.length === listLimit ? <ShowMoreButton/> : ''}
    </div>
  );
}

export default MyTrainingList;
