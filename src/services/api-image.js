const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24134300-00541668bcca34b3aaf1e0ab3';

export default async function fetchPicturesApi(searchName, page) {
  const response = await fetch(
    `${BASE_URL}?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return await response.json();
}
