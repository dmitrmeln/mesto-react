import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ImagePopup from "./ImagePopup/ImagePopup";
import Api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup/ConfirmationPopup";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import FormValidator from "./FormValidator/FormValidator";
import { validationConfig } from "../utils/constants";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setConfirmationPopupState(false);
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

  function handleUpdateUser(data) {
    setIsLoading(true)
    Api.setUserInfo(data)
      .then((result) => {
        setCurrentUser(result);
        changeAllPopupsState();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    Api.setUserAvatar(data)
      .then((result) => {
        setCurrentUser(result);
        changeAllPopupsState();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    Api.createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        changeAllPopupsState();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleCardDelete(card) {
    setConfirmationPopupState(true);
    setSelectedCard({
      id: card._id,
      src: card.link,
      title: card.name,
    });
  }

  function handleConfirmationSubmit(selectedCard) {
    setIsLoading(true)
    Api.deleteCard(selectedCard.id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard.id));
        setConfirmationPopupState(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  const formValidators = {};

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute("name");

      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };

  enableValidation(validationConfig);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={function handleEditAvatarClick() {
            formValidators["avatar-form"].clearForm();
            formValidators["avatar-form"].resetValidation();
            setEditAvatarPopupState(true);
          }}
          onEditProfile={function handleEditProfileClick() {
            formValidators["edit-form"].resetValidation();
            setEditProfilePopupState(true);
          }}
          onAddPlace={function handleAddPlaceClick() {
            formValidators["add-form"].clearForm();
            formValidators["add-form"].resetValidation();
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
        isLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
        onConfirmation={handleConfirmationSubmit}
        isLoading={isLoading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
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
