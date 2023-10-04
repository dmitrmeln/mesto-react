export default function PopupWithForm(props) {
  return (
    <div>
      <div
        onClick={props.onClose}
        className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <form className="popup__form" name={`${props.name}-form`} noValidate>
            <h2 className="popup__heading">{props.title}</h2>
            {props.children}
            <button type="submit" className="popup__button">{props.buttonText}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
