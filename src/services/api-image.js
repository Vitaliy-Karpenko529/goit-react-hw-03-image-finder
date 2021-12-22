const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24134300-00541668bcca34b3aaf1e0ab3';

function fetchPicturesApi(query, page) {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No results were found for ${query}`));
  });
}

const API = { fetchPicturesApi };

export default API;
