class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._button = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  enableValidation() {
    this._setEventListener();
  }

  _setEventListener() {
    this._inputs.forEach((input) => {
      this._hideInputError(input);

      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _showInputError(input) {
    input.classList.add(this._config.inputErrorClass);
    const span = this._formElement.querySelector(`.${input.id}-error`);
    span.textContent = input.validationMessage;
    span.classList.add(this._config.errorClass);
  }

  _hideInputError(input) {
    input.classList.remove(this._config.inputErrorClass);
    const span = this._formElement.querySelector(`.${input.id}-error`);
    span.textContent = "";
    span.classList.remove(this._config.errorClass);
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  clearForm() {
    this._formElement.reset();
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
  }
}

export default FormValidator;
