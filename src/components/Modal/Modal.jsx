import { Component } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  state = {
    loading: false,
  };

  static propTypes = {
    loading: PropTypes.bool,
  };

  componentDidMount() {
    this.setState({ loading: true });
    window.addEventListener('keydown', this.closePictureByEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closePictureByEscape);
  }

  closePictureByEscape = e => {
    if (e.code !== 'Escape') {
      return;
    }

    this.props.onClose();
  };

  closePicture = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  pictureLoaded = () => {
    this.setState({ loading: false });
  };

  render() {
    const { alt, src } = this.props;

    return createPortal(
      <div className={styles.Overlay} onClick={this.closePicture}>
        <div className={styles.Modal} onLoad={this.pictureLoaded}>
          <img className={styles.Image} src={src} alt={alt}></img>
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
