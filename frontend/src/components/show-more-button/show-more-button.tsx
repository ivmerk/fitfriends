import { useAppDispatch } from '../../hooks';
import { getNextPage } from '../../store/user-process/user-process';

export function ShowMoreButton():JSX.Element{
  const dispatch = useAppDispatch();

  return(
    <div className="show-more my-trainings__show-more">
      <button
        className="btn show-more__button show-more__button--more"
        type="button"
        onClick={ () => dispatch(getNextPage())}
      >Показать еще
      </button>
      <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
    </div>
  );
}
