import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureCloseModal = bigPictureModal.querySelector('.big-picture__cancel');
const pictureModalImg = bigPictureModal.querySelector('.big-picture__img img');
const pictureListComments = bigPictureModal.querySelector('.social__comments');
const pictureModalComment = bigPictureModal.querySelector('.social__comment');
const pictureModalLikesCount = bigPictureModal.querySelector('.likes-count');
const pictureModalCommentCount = bigPictureModal.querySelector('.social__comment-shown-count');
const pictureModalCommentTotalCount = bigPictureModal.querySelector('.social__comment-total-count');
const pictureModalDescription = bigPictureModal.querySelector('.social__caption');
const loadComments = bigPictureModal.querySelector('.comments-loader');
const socialCommentsCount = bigPictureModal.querySelector('.social__comment-count');

let commentsCount = COMMENTS_STEP;
const currentComments = [];

const renderCommentsInPicture = (comments) => {
  comments.forEach((comment) => {
    const commentElement = pictureModalComment.cloneNode(true);
    const commentAvatarElement = commentElement.querySelector('.social__picture');
    commentAvatarElement.src = comment.avatar;
    commentAvatarElement.alt = comment.name;
    const commentTextElement = commentElement.querySelector('.social__text');
    commentTextElement.textContent = comment.message;

    pictureListComments.appendChild(commentElement);
  });

};

const renderCommentsLoad = () => {
  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;
  const commentsSelected = currentComments.slice(0, commentsCount);
  for (let i = 0; i < commentsSelected.length; i++) {
    renderCommentsInPicture(commentsSelected[i]);
  }

};

const deleteComments = () => {
  pictureListComments.innerHTML = '';
};

const renderBigPicture = (photo) => {
  pictureModalImg.src = photo.url;
  pictureModalLikesCount.textContent = photo.likes;
  pictureModalCommentCount.textContent = photo.comments.length;
  pictureModalCommentTotalCount.textContent = photo.comments.length;
  pictureModalDescription.textContent = photo.description;
  renderCommentsInPicture(photo.comments);
};

const openbigPictureModal = () => {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closebigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closebigPictureModal();
  }
}

bigPictureCloseModal.addEventListener('click', () => {
  closebigPictureModal();
});

const openBigPicture = (photo) => {
  openbigPictureModal();
  deleteComments();
  renderBigPicture(photo);
};

export { openBigPicture };
