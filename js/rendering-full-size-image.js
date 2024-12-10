import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const listCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = bigPictureElement.querySelector('.social__comment');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const loadCommentsElement = bigPictureElement.querySelector('.comments-loader');
const commentFragment = document.createDocumentFragment();
let commentsCount = COMMENTS_STEP;
let currentComments = [];

const renderCommentsInPicture = (comment) => {
  const newComment = socialCommentElement.cloneNode(true);
  const avatar = newComment.querySelector('.social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  const commentTextElement = newComment.querySelector('.social__text');
  commentTextElement.textContent = comment.message;
  return newComment;
};

const deleteComments = () => {
  listCommentsElement.innerHTML = '';
};

const renderCommentsLoad = () => {
  deleteComments();
  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;
  for (let i = 0; i < commentsCount; i++) {
    commentFragment.appendChild(renderCommentsInPicture(currentComments[i]));
  }
  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    loadCommentsElement.classList.add('hidden');
  } else {
    loadCommentsElement.classList.remove('hidden');
  }
  commentCountElement.textContent = commentsCount;
  listCommentsElement.appendChild(commentFragment);
};

const renderBigPicture = (photo) => {
  bigPictureImgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  commentCountElement.textContent = photo.comments.length;
  commentTotalCountElement.textContent = photo.comments.length;
  descriptionElement.textContent = photo.description;
  renderCommentsInPicture(photo.comments);
};

const onLoadButtonButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderCommentsLoad();
};

const openbigPictureElement = () => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closebigPictureElement = () => {
  commentsCount = COMMENTS_STEP;
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closebigPictureElement();
  }
}

bigPictureCloseElement.addEventListener('click', () => {
  closebigPictureElement();
});

const showBigPicture = (photo) => {
  currentComments = photo.comments.slice();
  openbigPictureElement();
  deleteComments();
  renderBigPicture(photo);
  renderCommentsLoad();
  document.addEventListener('keydown', onDocumentKeydown);
};

loadCommentsElement.addEventListener('click', onLoadButtonButtonClick);

export { showBigPicture};
