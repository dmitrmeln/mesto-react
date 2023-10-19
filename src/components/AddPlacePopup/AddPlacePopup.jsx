import {useState} from "react";

export default function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handlePlaceChange(evt) {
    setPlace(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link: place,
    });
  }

  return (
    <div>
      <div
        onClick={props.onClose}
        className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <form
            className="popup__form"
            name="add-form"
            onSubmit={handleSubmit}
            noValidate>
            <h2 className="popup__heading">Новое место</h2>
            <input
              type="text"
              onChange={handleNameChange}
              className="popup__input"
              id="popup__card-name"
              name="name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__error popup__card-name-error"></span>
            <input
              type="url"
              onChange={handlePlaceChange}
              className="popup__input"
              id="popup__card-link"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__error popup__card-link-error"></span>
            <button type="submit" className="popup__button">
              Создать
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
