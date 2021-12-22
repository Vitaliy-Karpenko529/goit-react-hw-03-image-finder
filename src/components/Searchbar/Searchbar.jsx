import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

class Searchbar extends Component {
  state = {
    query: '',
  };

  static propTypes = {
    query: PropTypes.string,
  };

  inputChange = event => {
    this.setState({ query: event.target.value.toLowerCase() });
  };

  searchbarFormSubmit = event => {
    event.preventDefault();
    const { query } = this.state;

    if (query.trim() === '') {
      return toast.warn('Please, enter your query');
    }

    this.props.onSubmit(query);

    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.searchbarFormSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <ImSearch />
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.inputChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
