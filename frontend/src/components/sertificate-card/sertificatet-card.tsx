import { useEffect, useState } from 'react';
import { HOST_PORT } from '../../common/constant';
import { IconChange, IconEdit, IconTrash } from '../svg-const/svg-const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllTrainerSertificates, getIsLoadingComplete, getNewUserSertificate } from '../../store/user-data/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { HelmetProvider } from 'react-helmet-async';
import { updateUser, uploadFilePdf, uploadSertImg } from '../../store/api-action';


type SertificateCardPropes = {item:string}


export function SertificateCard({item}:SertificateCardPropes):JSX.Element{
  const dispatch = useAppDispatch();

  const allSertificates = useAppSelector(getAllTrainerSertificates);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const sertUrl = useAppSelector(getNewUserSertificate);

  const [newSertEvt, setNewSertEvt] = useState<EventTarget & HTMLInputElement>();
  const [delSertUrl, setDelSertUrl] = useState('');
  const [isBlockEdit, setIsBlockEdit] = useState(false);

  const onSubmit = () => {
    if(allSertificates){
      if(newSertEvt){
        if(newSertEvt.files && newSertEvt.files[0].type === 'image/pdf' ) {
          dispatch(uploadFilePdf(newSertEvt.files[0]));
        } else if(newSertEvt.files){
          dispatch(uploadSertImg(newSertEvt.files[0]));
        }} else
      {
        const newSertificates = [...allSertificates.filter((card) => card !== delSertUrl)];
        dispatch(updateUser({trainerBody:{sertificates: newSertificates}}));
      }
    }
  };

  function CardsMenu():JSX.Element{
    return(
      <div className="certificate-card__controls">
        <label className="btn-icon certificate-card__control">
          <input
            type="file" aria-label="next"
            id={item}
            accept="image/png, image/jpeg, image/pdf"
            onChange={(evt)=>{ setNewSertEvt(evt.target);}}
            hidden
          />
          <svg width="16" height="16" aria-hidden="true">
            <IconChange/>
          </svg>
        </label>
        <label className="btn-icon certificate-card__control">
          <input
            type="button"
            aria-label="next"
            id={item}
            onClick={(evt)=>{ setDelSertUrl(evt.currentTarget.id);}}
            hidden
          />
          <svg width="14" height="16" aria-hidden="true">
            <IconTrash/>
          </svg>
        </label>
      </div>
    );
  }

  const onSaveRedoButtonClickHandle = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!isBlockEdit) {setIsBlockEdit(true);} else{
      setIsBlockEdit(false);
      onSubmit();
    }
  };

  useEffect(() => {
    if (newSertEvt && isLoadingComplete && sertUrl !== '' && allSertificates?.includes(sertUrl) === false && allSertificates?.includes(item) === true) {
      const newSertificates = [...allSertificates.map((card) => card === item ? sertUrl : card)];
      dispatch(updateUser({trainerBody:{sertificates: newSertificates}}));
    }
  }, [sertUrl]);

  if (!isLoadingComplete){
    return(
      <HelmetProvider>
        <LoadingScreen/>
      </HelmetProvider>);}

  return(
    <li className="personal-account-coach__item">
      <div className="certificate-card certificate-card--edit">
        <div className="certificate-card__image">
          <picture>
            <img src={`${HOST_PORT}${item}`} width="294" height="360" alt="Сертификат"></img>
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
            </svg>
            <span>{isBlockEdit ? 'Coxранить' : 'Изменить'}</span>
          </button>
          {isBlockEdit ? <CardsMenu/> : ''}
        </div>
      </div>
    </li>
  );
}
