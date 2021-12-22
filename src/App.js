import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import ImageGallery from './components/ImageGallery';
import API from './services/api-image';
import Modal from './components/Modal';
import Load from './components/Loader';
import styles from './App.module.css';

class App extends Component {
  state = {
    query: '',
    pictures: [],
    page: 1,
    error: '',
    openModal: false,
    isLoading: false,
    largeImageURL: '',
    alt: '',
    activeButton: false,
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
    this.setState({ isLoading: true, activeButton: true });

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
          activeButton: false,
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
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  onOpenModal = (imgLarge, alt) => {
    this.setState({
      largeImageURL: imgLarge,
      alt,
    });
  };

  onCloseModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { pictures, isLoading, error, largeImageURL, alt, activeButton } =
      this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onFormSubmit} />
        {isLoading && <Load />}
        {pictures.length > 0 && !error && (
          <>
            <ImageGallery openModal={this.onOpenModal} pictures={pictures} />
            <Button
              fetchPicturesApi={this.onLoadMorePictures}
              status={activeButton}
            />
          </>
        )}
        {largeImageURL && (
          <Modal onClose={this.onCloseModal} src={largeImageURL} alt={alt} />
        )}
        {error && <p className={styles.error}>{error}</p>}
        <ToastContainer autoClose={3000} theme={'colored'} />
      </div>
    );
  }
}
export default App;
