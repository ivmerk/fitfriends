import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { ArrowCheck, ArrowDown, IconCup, IconImport, IconWeight } from '../svg-const/svg-const';
import { UserPasswordLength, UserTitleLength, userGenders } from '../../common/constant.user';
import { capitalizeFirst } from '../../common/utils';
import { UserRole } from '../../types/user-role.enum';
import { UserFormRegister } from '../../types/user';
import { useAppDispatch } from '../../hooks';
import { createUserGeneral } from '../../store/user-process/user-process';

function RegistrationFormBegin():JSX.Element {
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const [userGender, setUserGender] = useState(userGenders[0]);
  const [userRole, setUserRole] = useState(UserRole.Client);
  const [isUserAgreementAprooved, setIsUserAgreementAprooved] = useState(false);


  const [validName, setValidName] = useState(false);
  const [validPass, setValidPass] = useState(false);

  const onChooseGenderClickHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setUserGender(evt.currentTarget.value);
  };

  const onNameKeyDownCaptureHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if(nameRef.current) {
      if ((nameRef.current.value.length >= UserTitleLength.Min) && (nameRef.current.value.length <= UserTitleLength.Max)){
        setValidName(true);
      } else { setValidName(false);}
    }
  };

  const onPassKeyDownCaptureHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if(passRef.current){
      if((passRef.current.value.length >= UserPasswordLength.Min) && (passRef.current.value.length <= UserPasswordLength.Max)){
        setValidPass(true);
      } else { setValidPass(false);}
    }
  };

  const onSubmit = (user: UserFormRegister)=> {
    dispatch(createUserGeneral(user));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(nameRef.current && emailRef.current && passRef.current && validName && validPass && isUserAgreementAprooved){
      onSubmit({
        userName: nameRef.current.value,
        userMail: emailRef.current.value,
        userAvatar:'',
        birthDate: '12-12-23',
        location: '',
        password: passRef.current.value,
        userGender: userGender,
        userRole: userRole

      });
    }
  };
type ChooseGenderPrope = {
  item: string;
}
function ChooseGender({item}: ChooseGenderPrope):JSX.Element{
  return(
    <div
      className="custom-toggle-radio__block"
      key={item}
    >
      <label>
        <input
          type="radio"
          name="sex"
          value={item}
          checked={userGender === item}
          onChange={onChooseGenderClickHandle}
        />
        <span className="custom-toggle-radio__icon"/>
        <span className="custom-toggle-radio__label">{capitalizeFirst(item)}</span>
      </label>
    </div>
  );
}
return(
  <div className="popup-form__content">
    <div className="popup-form__title-wrapper">
      <h1 className="popup-form__title">Регистрация</h1>
    </div>
    <form
      className="popup-form__form"
      action=""
      onSubmit={handleSubmit}
    >
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <div className="input-load-avatar">
            <label>
              <input className="visually-hidden" type="file" accept="image/png, image/jpeg"/>
              <span className="input-load-avatar__btn">
                <svg width="20" height="20" aria-hidden="true">
                  <IconImport/>
                </svg>
              </span>
            </label>
          </div>
          <div className="sign-up__description">
            <h2 className="sign-up__legend">Загрузите фото профиля</h2>
            <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
          </div>
        </div>
        <div className="sign-up__data">
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Имя</span>
              <input
                className="custom-input__wrapper"
                type="text"
                name="name"
                ref={nameRef}
                onChange={onNameKeyDownCaptureHandle}
              />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">E-mail</span>
              <span >
                <input
                  className="custom-input__wrapper"
                  type="email"
                  name="email"
                  ref={emailRef}
                />
              </span>
            </label>
          </div>
          <div className="custom-input">
            <label><span className="custom-input__label">Дата рождения</span>
              <span className="custom-input__wrapper">
                <input
                  type="date"
                  name="birthday"
                  max="2099-12-31"
                />
              </span>
            </label>
          </div>
          <div className="custom-select custom-select--not-selected"><span className="custom-select__label">Ваша локация</span>
            <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
              <span className="custom-select__text"></span>
              <span className="custom-select__icon">
                <svg width="15" height="6" aria-hidden="true">
                  <ArrowDown/>
                </svg>
              </span>
            </button>
            <ul className="custom-select__list" role="listbox">
            </ul>
          </div>
          <div className="custom-input">
            <label><span className="custom-input__label">Пароль</span>
              <input
                className="custom-input__wrapper"
                type="password"
                name="password"
                ref={passRef}
                onChange={onPassKeyDownCaptureHandle}
              />
            </label>
          </div>
          <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
            <div className="custom-toggle-radio custom-toggle-radio--big">
              {userGenders.map((item:string) => (<ChooseGender item={item} key={item}/>
              ))}
            </div>
          </div>
        </div>
        <div className="sign-up__role">
          <h2 className="sign-up__legend">Выберите роль</h2>
          <div className="role-selector sign-up__role-selector">
            <div className="role-btn">
              <label>
                <input
                  className="visually-hidden"
                  type="radio"
                  name="role"
                  value="coach"
                  onChange={() => setUserRole(UserRole.Trainer)}
                  checked={userRole === UserRole.Trainer}
                />
                <span className="role-btn__icon">
                  <svg width="12" height="13" aria-hidden="true">
                    <IconCup/>
                  </svg>
                </span>
                <span className="role-btn__btn">Я хочу тренировать</span>
              </label>
            </div>
            <div className="role-btn">
              <label>
                <input
                  className="visually-hidden"
                  type="radio"
                  name="role"
                  value="sportsman"
                  onChange={() => setUserRole(UserRole.Client)}
                  checked={userRole === UserRole.Client}
                />
                <span className="role-btn__icon">
                  <svg width="12" height="13" aria-hidden="true">
                    <IconWeight/>
                  </svg>
                </span>
                <span className="role-btn__btn">Я хочу тренироваться</span>
              </label>
            </div>
          </div>
        </div>
        <div className="sign-up__checkbox">
          <label>
            <input
              type="checkbox"
              value="user-agreement"
              name="user-agreement"
              onChange={() => setIsUserAgreementAprooved(!isUserAgreementAprooved)}
              checked={isUserAgreementAprooved}
            />
            <span className="sign-up__checkbox-icon">
              <svg width="9" height="6" aria-hidden="true">
                <ArrowCheck/>
              </svg>
            </span>
            <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
          </label>
        </div>
        <button className="btn sign-up__button" type="submit">Продолжить</button>
      </div>
    </form>
  </div>
);
}
export default RegistrationFormBegin;
