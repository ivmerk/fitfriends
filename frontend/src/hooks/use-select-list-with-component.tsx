import React, { useState} from 'react';
import { ArrowDown} from '../components/svg-const/svg-const';
import {capitalizeFirst} from './../common/utils';

interface SelectListHook {
  selectedOption: string;
  SelectComponent: React.ReactElement;
}

function useSelectListWithComponent (initialValue: string, label: string, options: string[], isEdit: boolean): SelectListHook{

  const [selectedOption, setSelectedOption] = useState(initialValue || (options.length > 0 ? options[0] : ''));
  const [isMenuOn, setIsMenuOn] = useState(false);

  type ChooseOptionItemPrope = {item: string}
  function ChooseOptionItem({item} :ChooseOptionItemPrope): JSX.Element {
    return(
      <li
        className="custom-select__item"
        value={item}
        onClick={()=>setSelectedOption(item)}
      >{capitalizeFirst(item)}
      </li>
    );
  }
  const SelectComponent = (
    <div className={`custom-select${isMenuOn ? ' is-open' : ''} user-info-edit__select`}
      onClick={()=>{if (isEdit) {setIsMenuOn(!isMenuOn);}}}
    >
      <span className="custom-select__label">{label ? capitalizeFirst(label) : ''}</span>
      <button className={`custom-select__button${isEdit ? '' : ' is-disabled'} `}type="button" aria-label="Выберите одну из опций">
        <span className="custom-select__placeholder">{selectedOption ? capitalizeFirst(selectedOption) : ''}</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            {isEdit ? <ArrowDown/> : ''}
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {options.map((item:string) => (<ChooseOptionItem item={item} key={item}/>))}
      </ul>
    </div>
  );
  return {
    selectedOption,
    SelectComponent,
  };
}


export default useSelectListWithComponent;
