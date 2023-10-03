export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div>
      <div
        onClick={onClose}
        className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <form className="popup__form" name={`${name}-form`} noValidate>
            <h2 className="popup__heading">{title}</h2>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
