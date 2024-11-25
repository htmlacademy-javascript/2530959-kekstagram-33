import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureCloseModal = bigPictureModal.querySelector('.big-picture__cancel');
const pictureModalImg = bigPictureModal.querySelector('.big-picture__img img');
const pictureListComments = bigPictureModal.querySelector('.social__comments');
const socialComment = bigPictureModal.querySelector('.social__comment');
const pictureModalLikesCount = bigPictureModal.querySelector('.likes-count');
const pictureModalCommentCount = bigPictureModal.querySelector('.social__comment-shown-count');
const pictureModalCommentTotalCount = bigPictureModal.querySelector('.social__comment-total-count');
const pictureModalDescription = bigPictureModal.querySelector('.social__caption');
const loadComments = bigPictureModal.querySelector('.comments-loader');
const socialCommentsCount = bigPictureModal.querySelector('.social__comment-count');

const commentFragment = document.createDocumentFragment();

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const renderCommentsInPicture = (comment) => {
  const newComment = socialComment.cloneNode(true);

  const avatar = newComment.querySelector('.social__picture');

  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  const commentTextElement = newComment.querySelector('.social__text');
      commentTextElement.textContent = comment.message;

  return newComment;
};

const deleteComments = () => {
  pictureListComments.innerHTML = '';
};

const renderCommentsLoad = () => {
  deleteComments();

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  for (let i = 0; i < commentsCount; i++) {
    commentFragment.appendChild(renderCommentsInPicture(currentComments[i]));
  }

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden')
  }

  pictureModalCommentCount.textContent = commentsCount;

  pictureListComments.appendChild(commentFragment)
};

const renderBigPicture = (photo) => {
  pictureModalImg.src = photo.url;
  pictureModalLikesCount.textContent = photo.likes;
  pictureModalCommentCount.textContent = photo.comments.length;
  pictureModalCommentTotalCount.textContent = photo.comments.length;
  pictureModalDescription.textContent = photo.description;
  renderCommentsInPicture(photo.comments);
};

const onLoadButtonButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderCommentsLoad();
}

const openbigPictureModal = () => {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closebigPictureModal = () => {
  commentsCount = COMMENTS_STEP;
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

const showBigPicture = (photo) => {
  currentComments = photo.comments.slice();
  openbigPictureModal();
  deleteComments();
  renderBigPicture(photo);
  renderCommentsLoad();
  document.addEventListener('keydown', onDocumentKeydown);
};

loadComments.addEventListener('click', onLoadButtonButtonClick);

export { showBigPicture};
