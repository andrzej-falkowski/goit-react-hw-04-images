import { Component } from "react";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.scss";

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { image } = this.props;
    return (
      <>
        <li className={styles.GalleryItem} onClick={this.toggleModal}>
          <img
            className={styles.ImageGalleryItem}
            src={image.webformatURL}
            alt={image.tags}
          />
        </li>
        {this.state.showModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClick={() => this.toggleModal()}
          />
        )}
      </>
    );
  }
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
