import styles from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ fetchPicturesApi }) {
  return (
    <button className={styles.Button} type="button" onClick={fetchPicturesApi}>
      Load more
    </button>
  );
}

Button.propTypes = {
  fetchPicturesApi: PropTypes.func,
};

export default Button;
