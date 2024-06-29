import PropTypes from "prop-types";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

function Modal({onClick, largeImageURL, tags}) {

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  });

  const handleKeyDown = (event) => {
    if (event.keyCode === 27 || event.currentTarget === event.target) {
      onClick();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClick();
    }
  };

  return (
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img
          src={largeImageURL}
          alt={tags}
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  handleKeyDown: PropTypes.func,
  handleBackdropClick: PropTypes.func,
  largeImageUrl: PropTypes.string,
  tags: PropTypes.string,
};

export default Modal;