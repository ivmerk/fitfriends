import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../../hooks';
import { getIsLoadingTrainingComplete, getTrainingListCardsForCatalog } from '../../../store/training-data/selector';
import { getListLimit } from '../../../store/user-process/selector';
import LoadingScreen from '../../../pages/loading-screen/loading-screen';
import SmallTrainingCard from '../../small-training-card/small-training-card';
import { ShowMoreButton } from '../../show-more-button/show-more-button';
import AnnounceSpec from '../../announce-spec/announce-spec';

function TrainingCatalogList():JSX.Element{

  const trainingList = useAppSelector(getTrainingListCardsForCatalog);
  const isLoadingComplete = useAppSelector(getIsLoadingTrainingComplete);
  const listLimit = useAppSelector(getListLimit);
  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}
  return(
    <div className="training-catalog">
      <ul className="training-catalog__list">
        {trainingList ? trainingList.map((card) => <SmallTrainingCard selectedCard={card} key={card.trainingId} itemType='training-catalog__item'/>) : <AnnounceSpec/>}
      </ul>
      <div className="show-more training-catalog__show-more">
        {trainingList.length === listLimit ? <ShowMoreButton/> : ''}
      </div>
    </div>
  );
}
export default TrainingCatalogList;
