import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <div>
      <div
        onMouseDown={props.onClose}
        className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <form
            className="popup__form"
            name="edit-form"
            onSubmit={handleSubmit}
            noValidate>
            <h2 className="popup__heading">Редактировать профиль</h2>
            <input
              type="text"
              defaultValue={name}
              onChange={handleNameChange}
              className="popup__input"
              id="popup__name"
              name="name"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__error popup__name-error"></span>
            <input
              type="text"
              defaultValue={description}
              onChange={handleDescriptionChange}
              className="popup__input"
              id="popup__about"
              name="about"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__error popup__about-error"></span>
            <button type="submit" className="popup__button">
              {props.isLoading ? "Сохранение..." : "Сохранить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
