import { ArrowDown } from '../svg-const/svg-const';

type UserMenuButtonPrope = {label: string; menu: string; isEdit: boolean};

function UserMenuButton({label, menu, isEdit}:UserMenuButtonPrope):JSX.Element{
  return(
    <>
      <span className="custom-select__label">{label}</span>
      <button className={`custom-select__button${isEdit ? '' : ' is-disabled'} `}type="button" aria-label="Выберите одну из опций">
        <span className="custom-select__placeholder">{menu}</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            {isEdit ? <ArrowDown/> : ''}
          </svg>
        </span>
      </button>
    </>
  );
}
export default UserMenuButton;
