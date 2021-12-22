import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ pictures, openModal }) {
  return (
    <ul className={styles.ImageGallery}>
      {pictures.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            tags={tags}
            src={webformatURL}
            largeImageURL={largeImageURL}
            openModal={openModal}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired,
  ),
  openModal: PropTypes.func,
};

export default ImageGallery;
