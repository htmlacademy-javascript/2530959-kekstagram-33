import { getRandomInteger, getRandomArrayElement } from './utils.js';
import { PHOTO_COUNTER, NAMES, MESSAGE, DESCRIPTION, MIN_LIKES, MAX_LIKES, MIN_AVATAR, MAX_AVATAR } from './photo-data-const.js';

let currentCommentId = 0;
let currentPostId = 0;
let currentUrl = 0;

const createComments = () => {
  currentCommentId++;
  const randomNameIndex = getRandomArrayElement(NAMES);
  const randonMessageIndex = getRandomArrayElement(MESSAGE);
  const randomAvatarIndex = getRandomInteger(MIN_AVATAR, MAX_AVATAR);

  return {
    id: currentCommentId,
    avatar: `img/avatar-${ randomAvatarIndex }.svg`,
    message: randonMessageIndex,
    name: randomNameIndex
  };
};

const createPhoto = () => {
  currentPostId++;
  currentUrl++;
  const randomDescriptionIndex = getRandomArrayElement(DESCRIPTION);
  const randomLikesIndex = getRandomInteger(MIN_LIKES, MAX_LIKES);

  const generateComments = Array.from({ length: getRandomInteger(0, 30) }, createComments);

  return {
    id: currentPostId,
    url: `photos/${currentUrl}.jpg`,
    description: randomDescriptionIndex,
    likes: randomLikesIndex,
    comments: generateComments
  };
};

const generatePhoto = () => Array.from({ length: PHOTO_COUNTER }, createPhoto);

export { generatePhoto };
