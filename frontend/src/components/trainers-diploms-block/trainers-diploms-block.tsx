import { ChangeEvent, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, IconImport } from '../svg-const/svg-const';
import { updateUser, uploadFilePdf, uploadSertImg } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllTrainerSertificates, getIsLoadingComplete, getLoggedUser, getNewUserSertificate } from '../../store/user-data/selectors';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { SERTIFICATES_SCREEN_COUNT_MAX } from '../../common/constant';
import { SertificateCard } from '../sertificate-card/sertificatet-card';

function TrainersDiplomsBlock():JSX.Element
{
  const dispatch = useAppDispatch();

  const user = useAppSelector(getLoggedUser);
  const allSertificates = useAppSelector(getAllTrainerSertificates);
  const sertUrl = useAppSelector(getNewUserSertificate);
  const isLoadingComplete = useAppSelector(getIsLoadingComplete);
  const [sertsForScreen, setSertsForScreen] = useState(allSertificates?.slice(0, SERTIFICATES_SCREEN_COUNT_MAX));

  const onFileHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    if(evt.target.files && evt.target.files[0].type === 'image/pdf' ) {
      dispatch(uploadFilePdf(evt.target.files[0]));
    } else if(evt.target.files){
      dispatch(uploadSertImg(evt.target.files[0]));
    }
  };

  function SertificatesBoardControll():JSX.Element {
    return(
      <div className="personal-account-coach__controls">
        <button
          className="btn-icon personal-account-coach__control"
          type="button"
          aria-label="previous"
          onClick={() => {if(sertsForScreen && allSertificates && sertsForScreen[0] !== allSertificates[0]){
            setSertsForScreen( allSertificates.slice(allSertificates.indexOf(sertsForScreen[0]) - 1, allSertificates.indexOf(sertsForScreen[0]) + SERTIFICATES_SCREEN_COUNT_MAX - 1));

          }}}
        >
          <svg width="16" height="14" aria-hidden="true">
            <ArrowLeft/>
          </svg>
        </button>
        <button
          className="btn-icon personal-account-coach__control"
          type="button"
          aria-label="next"
          onClick={() => {if(sertsForScreen && allSertificates && sertsForScreen[SERTIFICATES_SCREEN_COUNT_MAX - 1 ] !== allSertificates[allSertificates.length - 1]){
            setSertsForScreen( allSertificates.slice(allSertificates.indexOf(sertsForScreen[0]) + 1, allSertificates.indexOf(sertsForScreen[0]) + SERTIFICATES_SCREEN_COUNT_MAX + 1 ));
          }
          }}
        >
          <svg width="16" height="14" aria-hidden="true">
            <ArrowRight/>
          </svg>
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (isLoadingComplete && sertUrl !== '' && allSertificates?.includes(sertUrl) === false) {
      const newSertificates = [...allSertificates, sertUrl];
      dispatch(updateUser({trainerBody:{sertificates: newSertificates}}));
    }
    setSertsForScreen(allSertificates?.slice(0, SERTIFICATES_SCREEN_COUNT_MAX));
  }, [sertUrl, isLoadingComplete]);

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
        {(sertsForScreen && user?.trainerBody?.sertificates && user?.trainerBody?.sertificates.length > sertsForScreen?.length) ? <SertificatesBoardControll/> : ''}
      </div>
      <ul className="personal-account-coach__list">
        {sertsForScreen?.map((item:string) =>( <SertificateCard item={item} key={item}/>)) }
      </ul>
    </div>
  );
}
export default TrainersDiplomsBlock;
