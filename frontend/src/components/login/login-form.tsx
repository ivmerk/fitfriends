import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router';
import { AuthData } from '../../types/auth-data';
import { AppRoute } from '../../const';
import { logInAction } from '../../store/api-action';

function LoginForm():JSX.Element{
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [validPass, setValidPass] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: AuthData) => {
    if (validPass) {
      dispatch(logInAction(authData));
      navigate(AppRoute.ClientCard);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value
      });
    }
  };

  const onKeyDownCaptureHandle = (evt: ChangeEvent<HTMLElement>) => {
    evt.preventDefault();
    if(passwordRef.current !== null) {
      if ((passwordRef.current?.value.length >= 6) && (passwordRef.current?.value.length <= 12)) {
        setValidPass(true);
      } else {setValidPass(false);}}
  };
  return(
    <div className="popup-form__content">
      <div className="popup-form__title-wrapper">
        <h1 className="popup-form__title">Вход</h1>
      </div>
      <div className="popup-form__form">
        <form
          action=""
          onSubmit={handleSubmit}
        >
          <div className="sign-in">
            <div className="custom-input sign-in__input">
              <label>
                <span className="custom-input__label">E-mail</span>
                <span className="custom-input__wrapper">
                  <input
                    ref={loginRef}
                    placeholder="Email address"
                    type="email"
                    name="email"
                    id="email"
                  />

                </span>
              </label>
            </div>
            <div className="custom-input sign-in__input">
              <label>
                <span className="custom-input__label">Пароль</span>
                <span className="custom-input__wrapper">
                  <input
                    ref={passwordRef}
                    placeholder="Password"
                    onChange={onKeyDownCaptureHandle}
                    style={(validPass) ? {borderColor:'green'} : {borderColor:'red'}}
                    type="password"
                    name="password"
                    id="password"
                  />
                </span>
              </label>
            </div>
            <button className="btn sign-in__button" type="submit">Продолжить</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
