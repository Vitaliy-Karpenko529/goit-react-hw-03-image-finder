import styles from './ImageGallery.module.css';

function ImageGallery({ children }) {
  return <ul className={styles.ImageGallery}>{children}</ul>;
}
export default ImageGallery;
