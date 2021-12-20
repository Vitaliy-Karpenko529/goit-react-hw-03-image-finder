import styles from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ loadMore }) {
  return (
    <button className={styles.Button} onClick={loadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func,
};

export default Button;
