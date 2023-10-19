import {useRef} from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
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
            name="avatar-form"
            onSubmit={handleSubmit}
            noValidate>
            <h2 className="popup__heading">Обновить аватар</h2>
            <input
              type="url"
              ref={avatarRef}
              className="popup__input"
              id="popup__avatar-link"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__error popup__avatar-link-error"></span>
            <button type="submit" className="popup__button">
              {props.isLoading ? "Сохранение..." : "Сохранить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
