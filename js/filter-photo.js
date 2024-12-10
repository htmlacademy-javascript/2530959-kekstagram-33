import { renderPhotoList } from './rendering-miniatures.js';
import { debounce, DEBOUNCE_TIME } from './utils.js';

const PICTURE_COUNT = 10;
const filterElement = document.querySelector('.img-filters');
const defaultFilterElement = filterElement.querySelector('#filter-default');
const randomFilterElement = filterElement.querySelector('#filter-random');
const discussedFilterElement = filterElement.querySelector('#filter-discussed');

const changeFilters = (currentFilter) => {
  const activeButtonElement = filterElement.querySelector('.img-filters__button--active');
  if (activeButtonElement) {
    activeButtonElement.classList.remove('img-filters__button--active');
  }
  currentFilter.classList.add('img-filters__button--active');
};

const debounceFilterPosts = debounce((renderPosts) => {
  const currentPicturesElement = document.querySelectorAll('.picture');
  currentPicturesElement.forEach((element) => element.remove());
  renderPhotoList(renderPosts);
}, DEBOUNCE_TIME);

const getFilterPhotos = (evt, posts) => {
  const initialPostsList = posts;
  if (evt.target.closest(`#${randomFilterElement.id}`)) {
    changeFilters(randomFilterElement);
    const randomPosts = posts.toSorted(() => Math.random() - 0.5).slice(0, PICTURE_COUNT);
    debounceFilterPosts(randomPosts);
    return;
  }
  if (evt.target.closest(`#${defaultFilterElement.id}`)) {
    changeFilters(defaultFilterElement);
    debounceFilterPosts(initialPostsList);
    return;
  }
  if (evt.target.closest(`#${discussedFilterElement.id}`)) {
    changeFilters(discussedFilterElement);
    const mostDiscussedPosts = posts.toSorted((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
    debounceFilterPosts(mostDiscussedPosts);
  }
};

export { getFilterPhotos };
