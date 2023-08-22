function FriendCard():JSX.Element
{return(
  <li className="friends-list__item">
    <div className="thumbnail-friend">
      <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
        <div className="thumbnail-friend__image-status">
          <div className="thumbnail-friend__image">
            <picture>
              <source type="image/webp" srcSet="img/content/thumbnails/friend-14.webp, img/content/thumbnails/friend-14@2x.webp 2x"/>
              <img src="img/content/thumbnails/friend-14.jpg" srcSet="img/content/thumbnails/friend-14@2x.jpg 2x" width="78" height="78" alt=""/>
            </picture>
          </div>
        </div>
        <div className="thumbnail-friend__header">
          <h2 className="thumbnail-friend__name">Виктория</h2>
          <div className="thumbnail-friend__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-friend__location-address">Технологический институт II</address>
          </div>
        </div>
        <ul className="thumbnail-friend__training-types-list">
          <li>
            <div className="hashtag thumbnail-friend__hashtag"><span>#аэробика</span></div>
          </li>
        </ul>
        <div className="thumbnail-friend__activity-bar">
          <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
          </div>
        </div>
      </div>
      <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
        <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
        <div className="thumbnail-friend__button-wrapper">
          <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
          <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
        </div>
      </div>
    </div>
  </li>
);
}
export default FriendCard;
