import styles from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ pictures, openModal }) => (
  <ul className={styles.ImgGallery}>
    <ImageGalleryItem pictures={pictures} openModal={openModal} />
  </ul>
);

export default ImageGallery;
