// import { generatePhoto } from './generate-photo-data.js';
import { showBigPicture } from './rendering-full-size-image.js';

const containerPicturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// const similarPhotos = generatePhoto();

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

export { renderPhotoList };

