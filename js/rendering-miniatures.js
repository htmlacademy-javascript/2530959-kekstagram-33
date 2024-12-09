import { showBigPicture } from './rendering-full-size-image.js';
import { getFilterPhotos } from './filter-photo.js';

const containerPicturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imgFilterElement = document.querySelector('.img-filters');
const imgFiltersFormElement = document.querySelector('.img-filters__form');

const eventOnFilterElement = (dataForPosts) => {
  imgFilterElement.classList.remove('img-filters--inactive');
  imgFiltersFormElement.addEventListener('click', (evt) => {
    getFilterPhotos(evt, dataForPosts);
  });
};

const renderPhotoList = (similarPhotos) => {
  const similarListFragment = document.createDocumentFragment();

  similarPhotos.forEach((photo) => {
    const photoElement = pictureTemplate.cloneNode(true);

    const onPictureElementClick = (evt) => {
      evt.preventDefault();
      showBigPicture(photo);
    };

    photoElement.id = photo.id;
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoElement.addEventListener('click', onPictureElementClick);

    similarListFragment.appendChild(photoElement);
  });
  containerPicturesElement.appendChild(similarListFragment);
};

export { renderPhotoList, eventOnFilterElement };

