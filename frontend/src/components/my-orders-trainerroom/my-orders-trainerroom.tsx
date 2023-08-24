import { useNavigate } from 'react-router-dom';
import { ArrowLeft, IconSortDown, IconSortUp } from '../svg-const/svg-const';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOrderedListOfTraining } from '../../store/api-action';
import { getIsLoadingTrainingComplete, getOrderedTrainingList } from '../../store/training-data/selector';
import OrderTrainingCard from '../order-training-card/order-training-card';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { DEFAULT_MY_ORDER_ITEMS_COUNT, SortingType } from '../../common/constant';

function MyOrdersTrainerroom():JSX.Element{
  const dispatch = useAppDispatch();
  const trainingList = useAppSelector(getOrderedTrainingList);

  const isLoadingComplete = useAppSelector(getIsLoadingTrainingComplete);
  const navigate = useNavigate();

  const [qttSortType, setQttSortType] = useState('desc');
  const [totalMoneySortType, setTotalMoneySortType] = useState('desc');
  const [ordersOnScreenCount, setOrdersOnScreenCount] = useState(DEFAULT_MY_ORDER_ITEMS_COUNT);

  function ShowMoreButton():JSX.Element{
    return(
      <button
        className="btn show-more__button show-more__button--more"
        type="button"
        onClick={() =>{setOrdersOnScreenCount(ordersOnScreenCount + DEFAULT_MY_ORDER_ITEMS_COUNT);}}
      >Показать еще
      </button>
    );
  }

  const onClickAmountSortButtonHandle = () =>{
    setOrdersOnScreenCount(DEFAULT_MY_ORDER_ITEMS_COUNT);
    if (totalMoneySortType === SortingType.Asc) {
      setTotalMoneySortType(SortingType.Desc);
      dispatch(getOrderedListOfTraining({trainingQttSortingType:SortingType.None,totalMoneySortingType:SortingType.Asc}));
    } else {
      setTotalMoneySortType(SortingType.Asc);
      dispatch(getOrderedListOfTraining({trainingQttSortingType:SortingType.None,totalMoneySortingType:SortingType.Desc}));
    }};

  const onClickQttSortButtonHandle = () =>{
    setOrdersOnScreenCount(DEFAULT_MY_ORDER_ITEMS_COUNT);
    if (qttSortType === SortingType.Asc) {
      setQttSortType(SortingType.Desc);
      dispatch(getOrderedListOfTraining({trainingQttSortingType:'asc',totalMoneySortingType:SortingType.None}));
    } else {
      setQttSortType(SortingType.Asc);
      dispatch(getOrderedListOfTraining({trainingQttSortingType:SortingType.Desc,totalMoneySortingType:SortingType.None}));
    }};
  useEffect(() =>{
    dispatch(getOrderedListOfTraining({trainingQttSortingType:qttSortType,totalMoneySortingType:totalMoneySortType}));
  }, []);

  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}
  return(
    <main>
      <section className="my-orders">
        <div className="container">
          <div className="my-orders__wrapper">
            <button
              className="btn-flat btn-flat--underlined my-orders__back"
              type="button"
              onClick={()=>navigate(-1)}
            >
              <svg width="14" height="10" aria-hidden="true">
                <ArrowLeft/>
              </svg><span>Назад</span>
            </button>
            <div className="my-orders__title-wrapper">
              <h1 className="my-orders__title">Мои заказы</h1>
              <div className="sort-for">
                <p>Сортировать по:</p>
                <div className="sort-for__btn-container">
                  <button
                    className="btn-filter-sort"
                    type="button"
                    onClick={onClickAmountSortButtonHandle}
                  ><span>Сумме</span>
                    <svg width="16" height="10" aria-hidden="true">
                      {totalMoneySortType === 'asc' ? <IconSortUp/> : <IconSortDown/>}
                    </svg>
                  </button>
                  <button
                    className="btn-filter-sort"
                    type="button"
                    onClick={onClickQttSortButtonHandle}
                  ><span>Количеству</span>
                    <svg width="16" height="10" aria-hidden="true">
                      {qttSortType === 'asc' ? <IconSortUp/> : <IconSortDown/>}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <ul className="my-orders__list">
              {trainingList ? trainingList.slice(0, ordersOnScreenCount).map((item) => <OrderTrainingCard card={item} key={item.trainingId}/>) : ''}
            </ul>
            <div className="show-more my-orders__show-more">
              {trainingList.length > ordersOnScreenCount ? <ShowMoreButton/> : ''}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MyOrdersTrainerroom;
