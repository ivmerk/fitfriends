import { useState } from 'react';
import { ArrowCheck, ArrowLeft } from '../svg-const/svg-const';
import { useNavigate } from 'react-router-dom';
import MyPurchasesList from '../my-purchases-list/my-purchases-list';

function ClientPurchases ():JSX.Element {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  return (
    <main>
      <section className="my-purchases">
        <div className="container">
          <div className="my-purchases__wrapper">
            <button
              className="btn-flat my-purchases__back"
              type="button"
              onClick={()=>{navigate(-1);}}
            >
              <svg width="14" height="10" aria-hidden="true">
                <ArrowLeft/>
              </svg><span>Назад</span>
            </button>
            <div className="my-purchases__title-wrapper">
              <h1 className="my-purchases__title">Мои покупки</h1>
              <div className="my-purchases__controls">
                <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="user-agreement-1"
                      checked={isActive}
                      name="user-agreement"
                      onChange={()=>{setIsActive(!isActive);}}
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <ArrowCheck/>
                      </svg>
                    </span><span className="custom-toggle__label">Только активные</span>
                  </label>
                </div>
              </div>
            </div>
            <MyPurchasesList/>
            <div className="show-more my-purchases__show-more">
              <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
              <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ClientPurchases;
