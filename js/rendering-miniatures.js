import { generatePhoto } from './generate-photo-data.js';
import { showBigPicture } from './rendering-full-size-image.js';

const containerPicturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = generatePhoto();

const similarListFragment = document.createDocumentFragment();

const renderPhotoList = () => {
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

// const pictures = document.querySelector('.pictures');
// const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// const renderPhoto = (picture) => {
//   const {url, comments, likes} = picture;
//   const pictureElement = pictureTemplate.cloneNode(true);

//   pictureElement.querySelector('.picture__img').src = url;
//   pictureElement.querySelector('.picture__comments').textContent = comments.length;
//   pictureElement.querySelector('.picture__likes').textContent = likes;

//   const onPictureElementClick = (evt) => {
//     evt.preventDefault();

//     showBigPicture(picture);
//   };

//   pictureElement.addEventListener('click', onPictureElementClick);

//   return pictureElement;
// };

// const fragment = document.createDocumentFragment();

// const renderPhotos = (objects) => {
//   objects.forEach((item) => {
//     fragment.appendChild(renderPhoto(item));
//   });

//   pictures.appendChild(fragment);
// };

