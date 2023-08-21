import { ChangeEvent, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, IconChange, IconEdit, IconImport, IconTrash } from '../svg-const/svg-const';
import { updateUser, uploadFilePdf, uploadSertImg } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsLoadingComplete, getLoggedUser, getNewUserSertificate } from '../../store/user-data/selectors';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function TrainersDiplomsBlock():JSX.Element
{
  const dispatch = useAppDispatch();

  const user = useAppSelector(getLoggedUser);
  const sertUrl = useAppSelector(getNewUserSertificate);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);


  const [isBlockEdit, setIsBlockEdit] = useState(false);


  const submit = () => null;

  const onFileHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    if(evt.target.files && evt.target.files[0].type === 'image/pdf' ) {dispatch(uploadFilePdf(evt.target.files[0]));} else if(evt.target.files){
      dispatch(uploadSertImg(evt.target.files[0]));
    }
  };


  const onSaveRedoButtonClickHandle = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!isBlockEdit) {setIsBlockEdit(true);} else{
      submit();
    }
  };

  function CardsMenu():JSX.Element{
    return(
      <div className="certificate-card__controls">
        <button className="btn-icon certificate-card__control" type="button" aria-label="next">
          <svg width="16" height="16" aria-hidden="true">
            <IconChange/>
          </svg>
        </button>
        <button className="btn-icon certificate-card__control" type="button" aria-label="next">
          <svg width="14" height="16" aria-hidden="true">
            <IconTrash/>
          </svg>
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (isLoadingComplete && sertUrl !== '' && user?.trainerBody?.sertificates.includes(sertUrl) === false) {
      const newSertificates = [...user.trainerBody.sertificates, sertUrl];
      dispatch(updateUser({trainerBody:{sertificates: newSertificates}}));
    }
  }, [sertUrl]);

  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}

  return(
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <label className="btn-flat btn-flat--underlined personal-account-coach__button">
          <input
            className="visually-hidden"
            type="file"
            accept="image/png, image/jpeg, image/pdf"
            onChange={onFileHandle}
          />
          <svg width="14" height="14" aria-hidden="true">
            <IconImport/>
          </svg>
          <span>Загрузить</span>
        </label>
        <div className="personal-account-coach__controls">
          <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous">
            <svg width="16" height="14" aria-hidden="true">
              <ArrowLeft/>
            </svg>
          </button>
          <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
            <svg width="16" height="14" aria-hidden="true">
              <ArrowRight/>
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
              <button
                className={isBlockEdit ? 'btn-flat btn-flat--underlined certificate-card__button' : 'btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save'}
                type="button"
                onClick={onSaveRedoButtonClickHandle}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <IconEdit/>
                </svg><span>{isBlockEdit ? 'Coxранить' : 'Изменить'}</span>
              </button>
              {isBlockEdit ? <CardsMenu/> : ''}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
export default TrainersDiplomsBlock;
