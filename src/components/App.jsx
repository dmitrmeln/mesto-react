import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import Card from "./Card/Card";
import Api from "../utils/api";
import {useEffect, useState} from "react";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  function changeAllPopupsState() {
    setEditAvatarPopupState(false);
    setAddPlacePopupState(false);
    setEditProfilePopupState(false);
    setImagePopupState(false);
  }

  function closeAllPopups(evt) {
    if (evt.target.classList.contains("popup__close-button")) {
      changeAllPopupsState();
    }

    if (evt.target.classList.contains("popup_opened")) {
      changeAllPopupsState();
    }
  }

  function handleCardClick(evt) {
    setSelectedCard({
      id: evt.target.id,
      src: evt.target.src,
      title: evt.target.alt,
    });
    setImagePopupState(true);
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        changeAllPopupsState();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });

  function mapCards(cards) {
    return cards.map((item) => ({
      id: item._id,
      src: item.link,
      title: item.name,
      likes: item.likes.length,
    }));
  }

  useEffect(() => {
    Api.getInitialCards()
      .then((result) => {
        setCards(mapCards(result));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="page">
        <Header />
        <main className="page__content">
          <Main
            onEditAvatar={function handleEditAvatarClick() {
              setEditAvatarPopupState(true);
            }}
            onEditProfile={function handleEditProfileClick() {
              setEditProfilePopupState(true);
            }}
            onAddPlace={function handleAddPlaceClick() {
              setAddPlacePopupState(true);
            }}
          />
          <section className="cards">
            {cards.map((item) => (
              <Card key={item.id} card={item} onCardClick={handleCardClick} />
            ))}
          </section>
        </main>
        <Footer />
      </div>

      <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <input
          type="text"
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
          className="popup__input"
          id="popup__about"
          name="about"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error popup__about-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="add"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <input
          type="text"
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
          className="popup__input"
          id="popup__card-link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error popup__card-link-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Вы уверены?"
        name="confirmation"
        buttonText="Да"
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input
          type="url"
          className="popup__input"
          id="popup__avatar-link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error popup__avatar-link-error"></span>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
