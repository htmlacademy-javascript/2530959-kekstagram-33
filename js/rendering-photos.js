import { generatePhoto } from './generate-photo-data.js';

const containerPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = generatePhoto();

const similarListFragment = document.createDocumentFragment();

const renderPhotoList = () => {
  similarPhotos.forEach((photo) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    similarListFragment.appendChild(photoElement);
  });
  containerPictures.appendChild(similarListFragment);
};

export { renderPhotoList };
