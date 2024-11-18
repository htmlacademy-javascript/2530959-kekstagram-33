import { isEscapeKey } from './utils.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureCloseModal = bigPictureModal.querySelector('.big-picture__cancel');
const pictureModalImg = bigPictureModal.querySelector('.big-picture__img');
const pictureModalComments = bigPictureModal.querySelector('.social__comments');
const pictureModalLikesCount = bigPictureModal.querySelector('.likes-count');
const pictureModalCommentCount = bigPictureModal.querySelector('.social__comment-shown-count');
const pictureModalCommentTotalCount = bigPictureModal.querySelector('.social__comment-total-count');
const pictureModalDescription = bigPictureModal.querySelector('.social__caption');

pictureModalImg.src = photo.url;
pictureModalLikesCount.textContent = photo.likes;
pictureModalCommentCount.textContent = photo.comments.length;
pictureModalCommentTotalCount. textContent = photo.comments.length;
pictureModalDescription.textContent = photo.description;


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closebigPictureModal();
  }
};

function openbigPictureModal () {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closebigPictureModal () {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// userModalOpenElement.addEventListener('click', () => {
//   openbigPictureModal();
// });

bigPictureCloseModal.addEventListener('click', () => {
  closebigPictureModal();
});

