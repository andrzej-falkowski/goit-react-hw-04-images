import { useState } from "react";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.scss";

function ImageGalleryItem({image}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <>
      <li className={styles.GalleryItem} onClick={toggleModal}>
        <img
          className={styles.ImageGalleryItem}
          src={image.webformatURL}
          alt={image.tags}
        />
      </li>
      {showModal && (
        <Modal
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          onClick={() => toggleModal()}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  toggleModal: PropTypes.func,
};

export { ImageGalleryItem };
