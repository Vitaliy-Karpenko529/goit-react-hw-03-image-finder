import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import ImageGallery from './components/ImageGallery/ImageGallery';
import fetchPicturesApi from './services/api-image';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';

class App extends Component {
  state = {
    name: '',
    page: 1,
    pictures: [],
    status: 'idle',
    error: null,
    showModal: false,
    currentPicture: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    ) {
      const { name, page } = this.state;

      fetchPicturesApi(name, page)
        .then(pictures => {
          if (pictures.total === 0) {
            this.setState({
              error: `not found: ${name}`,
              status: 'rejected',
            });
          } else {
            this.setState(prevState => ({
              pictures: [...prevState.pictures, ...pictures.hits],
              status: 'resolved',
            }));
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  formSubmit = name => {
    this.setState({ name, pictures: [], page: 1, status: 'pending' });
  };

  loadMorePictures = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (id, largeImageURL, tags) => {
    this.setState({
      showModal: true,
      currentPicture: { id, largeImageURL, tags },
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { pictures, status, error, showModal, currentPicture } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.formSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <>
            <ImageGallery>
              {pictures.map(({ id, tags, webformatURL, largeImageURL }) => (
                <ImageGalleryItem
                  key={id}
                  id={id}
                  tags={tags}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  openModal={this.openModal}
                />
              ))}
            </ImageGallery>
            <Button loadMore={this.loadMorePictures} />
          </>
        )}
        {showModal && (
          <Modal picture={currentPicture} closeModal={this.closeModal} />
        )}
        {status === 'rejected' && <h1>{error}</h1>}
      </div>
    );
  }
}

export default App;
