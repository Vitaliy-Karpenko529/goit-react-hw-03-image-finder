import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({
  id,
  tags,
  webformatURL,
  largeImageURL,
  openModal,
}) {
  return (
    <li id={id} className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => openModal(id, largeImageURL, tags)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
};

export default ImageGalleryItem;
