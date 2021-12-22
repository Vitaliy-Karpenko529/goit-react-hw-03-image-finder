import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ tags, src, largeImageURL, openModal }) {
  return (
    <li className={styles.ImgGalleryItem} onClick={openModal}>
      <img
        className={styles.ImageGalleryItemImage}
        src={src}
        alt={tags}
        data-largeimg={largeImageURL}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func,
  tags: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
