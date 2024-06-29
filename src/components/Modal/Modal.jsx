import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 27 || event.currentTarget === event.target) {
      this.props.onClick();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClick();
    }
  };

  render() {
    // console.log(this.props);
    return (
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <img
            src={this.props.largeImageURL}
            alt={this.props.tags}
            onClick={this.onClick}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleKeyDown: PropTypes.func,
  handleBackdropClick: PropTypes.func,
  largeImageUrl: PropTypes.string,
  tags: PropTypes.string,
};

export default Modal;
