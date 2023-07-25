import Header from '../../components/header/header';

function TrainerRoomScreen():JSX.Element{
  return(
    <>
      <Header/>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>
            <section className="user-info-edit">
              <div className="user-info-edit__header">
                <div className="input-load-avatar">
                  <label>
                    <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg">
                    </input>
                    <span className="input-load-avatar__avatar">
                      <img src="img/content/user-photo-1.png" srcSet="img/content/user-photo-1@2x.png 2x" width="98" height="98" alt="user photo">
                      </img>
                    </span>
                  </label>
                </div>
                <div className="user-info-edit__controls">
                  <button className="user-info-edit__control-btn" aria-label="обновить">
                    <svg width="16" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-change"></use>
                    </svg>
                  </button>
                  <button className="user-info-edit__control-btn" aria-label="удалить">
                    <svg width="14" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-trash"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <form className="user-info-edit__form" action="#" method="post">
                <button className="btn-flat btn-flat--underlined user-info-edit__save-button" type="submit" aria-label="Сохранить">
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg><span>Сохранить</span>
                </button>
                <div className="user-info-edit__section">
                  <h2 className="user-info-edit__title">Обо мне</h2>
                  <div className="custom-input user-info-edit__input">
                    <label>
                      <span className="custom-input__label">Имя</span>
                      <span className="custom-input__wrapper">
                        <input type="text" name="name" value="Валерия"></input>
                      </span>
                    </label>
                  </div>
                  <div className="custom-textarea user-info-edit__textarea">
                    <label><span className="custom-textarea__label">Описание</span>
                      <textarea name="description" placeholder=" ">Персональный тренер и инструктор групповых программ с опытом  более 4х лет. Специализация: коррекция фигуры и осанки, снижение веса, восстановление после травм, пилатес.</textarea>
                    </label>
                  </div>
                </div>
                <div className="user-info-edit__section user-info-edit__section--status">
                  <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
                  <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
                    <label>
                      <input type="checkbox" name="ready-for-training" checked></input>
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span><span className="custom-toggle__label">Готов тренировать</span>
                    </label>
                  </div>
                </div>
                <div className="user-info-edit__section">
                  <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
                  <div className="specialization-checkbox user-info-edit__specialization">
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="yoga" checked></input>
                        <span className="btn-checkbox__btn">Йога</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="running"></input>
                        <span className="btn-checkbox__btn">Бег</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="aerobics" checked></input>
                        <span className="btn-checkbox__btn">Аэробика</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="boxing"></input>
                        <span className="btn-checkbox__btn">Бокс</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="power"></input>
                        <span className="btn-checkbox__btn">Силовые</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="pilates" checked></input>
                        <span className="btn-checkbox__btn">Пилатес</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="stretching" checked></input>
                        <span className="btn-checkbox__btn">Стрейчинг</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="crossfit"></input>
                        <span className="btn-checkbox__btn">Кроссфит</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="custom-select user-info-edit__select"><span className="custom-select__label">Локация</span>
                  <div className="custom-select__placeholder">ст. м. Адмиралтейская</div>
                  <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                    <span className="custom-select__text"></span>
                    <span className="custom-select__icon">
                      <svg width="15" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-down"></use>
                      </svg>
                    </span>
                  </button>
                  <ul className="custom-select__list" role="listbox">
                  </ul>
                </div>
                <div className="custom-select user-info-edit__select">
                  <span className="custom-select__label">Пол</span>
                  <div className="custom-select__placeholder">Женский</div>
                  <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                    <span className="custom-select__text"></span>
                    <span className="custom-select__icon">
                      <svg width="15" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-down"></use>
                      </svg>
                    </span>
                  </button>
                  <ul className="custom-select__list" role="listbox">
                  </ul>
                </div>
                <div className="custom-select user-info-edit__select">
                  <span className="custom-select__label">Уровень</span>
                  <div className="custom-select__placeholder">Профессионал</div>
                  <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                    <span className="custom-select__text"></span>
                    <span className="custom-select__icon">
                      <svg width="15" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-down"></use>
                      </svg>
                    </span>
                  </button>
                  <ul className="custom-select__list" role="listbox">
                  </ul>
                </div>
              </form>
            </section>
            <div className="inner-page__content">
              <div className="personal-account-coach">
                <div className="personal-account-coach__navigation">
                  <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-flash"></use>
                      </svg>
                    </div><span className="thumbnail-link__text">Мои тренировки</span>
                  </a>
                  <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-add"></use>
                      </svg>
                    </div><span className="thumbnail-link__text">Создать тренировку</span>
                  </a>
                  <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-friends"></use>
                      </svg>
                    </div><span className="thumbnail-link__text">Мои друзья</span>
                  </a>
                  <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-bag"></use>
                      </svg>
                    </div><span className="thumbnail-link__text">Мои заказы</span>
                  </a>
                  <div className="personal-account-coach__calendar">
                    <div className="thumbnail-spec-gym">
                      <div className="thumbnail-spec-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"></source>
                          <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""></img>
                        </picture>
                      </div>
                      <div className="thumbnail-spec-gym__header" >
                        <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="personal-account-coach__additional-info">
                  <div className="personal-account-coach__label-wrapper">
                    <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
                    <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
                      <svg width="14" height="14" aria-hidden="true">
                        <use xlinkHref="#icon-import"></use>
                      </svg><span>Загрузить</span>
                    </button>
                    <div className="personal-account-coach__controls">
                      <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous">
                        <svg width="16" height="14" aria-hidden="true">
                          <use xlinkHref="#arrow-left"></use>
                        </svg>
                      </button>
                      <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
                        <svg width="16" height="14" aria-hidden="true">
                          <use xlinkHref="#arrow-right"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <ul className="personal-account-coach__list">
                    <li className="personal-account-coach__item">
                      <div className="certificate-card certificate-card--edit">
                        <div className="certificate-card__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-1.webp, img/content/certificates-and-diplomas/certificate-1@2x.webp 2x"></source>
                            <img src="img/content/certificates-and-diplomas/certificate-1.jpg" srcSet="img/content/certificates-and-diplomas/certificate-1@2x.jpg 2x" width="294" height="360" alt="Сертификат - Биомеханика ударов в боксе"></img>
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Изменить</span>
                          </button>
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="personal-account-coach__item">
                      <div className="certificate-card">
                        <div className="certificate-card__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-2.webp, img/content/certificates-and-diplomas/certificate-2@2x.webp 2x"></source>
                            <img src="img/content/certificates-and-diplomas/certificate-2.jpg" srcSet="img/content/certificates-and-diplomas/certificate-2@2x.jpg 2x" width="294" height="360" alt="Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий"></img>
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Изменить</span>
                          </button>
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="personal-account-coach__item">
                      <div className="certificate-card">
                        <div className="certificate-card__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-3.webp, img/content/certificates-and-diplomas/certificate-3@2x.webp 2x"></source>
                            <img src="img/content/certificates-and-diplomas/certificate-3.jpg" srcSet="img/content/certificates-and-diplomas/certificate-3@2x.jpg 2x" width="294" height="360" alt="Сертифиционный курс по кроссфиту 2-го уровня"></img>
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Изменить</span>
                          </button>
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="personal-account-coach__item">
                      <div className="certificate-card">
                        <div className="certificate-card__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-4.webp, img/content/certificates-and-diplomas/certificate-4@2x.webp 2x"></source>
                            <img src="img/content/certificates-and-diplomas/certificate-4.jpg" srcSet="img/content/certificates-and-diplomas/certificate-4@2x.jpg 2x" width="294" height="360" alt="Сертификат инструкторов йоги"></img>
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Изменить</span>
                          </button>
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="personal-account-coach__item">
                      <div className="certificate-card">
                        <div className="certificate-card__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-5.webp, img/content/certificates-and-diplomas/certificate-5@2x.webp 2x"></source>
                            <img src="img/content/certificates-and-diplomas/certificate-5.jpg" srcSet="img/content/certificates-and-diplomas/certificate-5@2x.jpg 2x" width="294" height="360" alt="Сертификат фитне аэробики"></img>
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Изменить</span>
                          </button>
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="personal-account-coach__item">
                      <div className="certificate-card">
                        <div className="certificate-card__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-6.webp, img/content/certificates-and-diplomas/certificate-6@2x.webp 2x"></source>
                            <img src="img/content/certificates-and-diplomas/certificate-6.jpg" srcSet="img/content/certificates-and-diplomas/certificate-6@2x.jpg 2x" width="294" height="360" alt="Сертификат фитне аэробики"></img>
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Изменить</span>
                          </button>
                          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg><span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrainerRoomScreen;
