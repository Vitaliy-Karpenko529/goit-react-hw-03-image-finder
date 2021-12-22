import styles from './ImageGallery.module.css';

const ImageGalleryItem = ({ pictures, openModal }) => (
  <>
    {pictures.map(({ tags, webformatURL, largeImageURL }) => (
      <li key={largeImageURL} className={styles.ImgGalleryItem}>
        <img
          className={styles.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => openModal(largeImageURL, tags)}
        />
      </li>
    ))}
  </>
);

export default ImageGalleryItem;
