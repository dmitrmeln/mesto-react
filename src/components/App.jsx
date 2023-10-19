import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import Api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Api.getUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Api.getCardList()
      .then((result) => {
        setCards(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  function handleCardClick(card) {
    setSelectedCard({
      id: card._id,
      src: card.link,
      title: card.name,
    });
    setImagePopupState(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(data) {
    Api.setUserInfo(data)
      .then((result) => {
        setCurrentUser(result);
        changeAllPopupsState();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(data) {
    Api.setUserAvatar(data)
      .then((result) => {
        setCurrentUser(result);
        changeAllPopupsState();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(data) {
    Api.createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        changeAllPopupsState();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
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
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        title="Вы уверены?"
        name="confirmation"
        buttonText="Да"
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
