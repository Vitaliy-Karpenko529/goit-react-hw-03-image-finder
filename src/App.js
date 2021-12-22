import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import API from './services/api-image';
import Modal from './components/Modal/Modal';
import Load from './components/Loader/Loader';
import styles from './App.module.css';

class App extends Component {
  state = {
    query: '',
    pictures: [],
    page: 1,
    error: '',
    openModal: false,
    isLoading: false,
    modalImage: '',
    alt: '',
  };

  static propTypes = {
    query: PropTypes.string,
    pictures: PropTypes.array,
    page: PropTypes.number,
    isLoading: PropTypes.bool,
    openModal: PropTypes.bool,
    modalImage: PropTypes.string,
    alt: PropTypes.string,
    error: PropTypes.string,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchPicturesApi();
    }
  }

  onFormSubmit = query => {
    this.setState({ query, pictures: [], page: 1, error: null });
  };

  fetchPicturesApi = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    API.fetchPicturesApi(query, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return toast.error(` Not found) ${query}!`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        this.setState(({ pictures, page }) => ({
          pictures: [...pictures, ...hits],
          page: page,
        }));
      })
      .catch(error => this.setState({ error: 'Please, try again' }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMorePictures = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.onScroll();
  };

  onScroll = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  onOpenModal = e => {
    e.preventDefault();
    this.setState({
      openModal: true,
      modalImage: e.target.dataset.largeimg,
      alt: e.target.alt,
    });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { pictures, isLoading, openModal, modalImage, alt, error } =
      this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onFormSubmit} />
        {isLoading && <Load />}
        {pictures.length > 0 && !error && (
          <>
            <ImageGallery openModal={this.onOpenModal} pictures={pictures} />
            <Button fetchPicturesApi={this.onLoadMorePictures} />
          </>
        )}
        {openModal && (
          <Modal onClose={this.onCloseModal} src={modalImage} alt={alt} />
        )}
        {error && <p className={styles.error}>{error}</p>}
        <ToastContainer autoClose={3000} theme={'colored'} />
      </div>
    );
  }
}
export default App;
