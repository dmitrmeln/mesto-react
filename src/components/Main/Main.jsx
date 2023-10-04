import {useEffect, useState} from "react";
import Api from "../../utils/api"

function Main({onEditAvatar, onEditProfile, onAddPlace}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  
  useEffect(() => {
    Api
      .getUserInfo()
      .then((result) => {
        setUserName(result.name);
        setUserDescription(result.about);
        setUserAvatar(result.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="profile">
      <div className="profile__avatar-container">
        <img className="profile__avatar" src={userAvatar} alt="аватар" />
        <div onClick={onEditAvatar} className="profile__avatar-icon"></div>
      </div>
      <div className="profile__info">
        <h1 className="profile__name">{userName}</h1>
        <button
          onClick={onEditProfile}
          type="button"
          className="profile__edit-button"></button>
        <p className="profile__about">{userDescription}</p>
      </div>
      <button
        type="button"
        onClick={onAddPlace}
        className="profile__add-button"></button>
    </section>
  );
}

export default Main;
