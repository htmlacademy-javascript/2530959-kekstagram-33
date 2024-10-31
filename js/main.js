const PHOTO_COUNTER = 25;

const NAMES = [
  'Ольга',
  'Тимур',
  'Владислав',
  'Сергей',
  'Юлия',
  'Наталья',
  'Игорь',
  'Татьяна',
  'Александр',
  'Евгения',
  'Дарья'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Мужчина играет с собакой.',
  'Цветущее поле в солнечный день.',
  'Проливной дождь в городе.',
  'Девушка читает книгу.',
  'Девушка собирает цветы в поле.',
  'Дети лепят снеговика.',
  'Тигрица вывела тигрят погулять.',
  'Красиво падает снег в ночном городе.',
  'В бассейне купаются дети.',
  'Кот сидит на подоконнике и смотрит в окно.'
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

let currentCommentId = 0;
let currentPostId = 0;
let currentUrl = 0;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createComments = () => {
  currentCommentId++;
  const randomNameIndex = getRandomInteger(0, NAMES.length - 1);
  const randonMessageIndex = getRandomInteger(0, MESSAGE.length - 1);
  const randomAvatarIndex = getRandomInteger(MIN_AVATAR, MAX_AVATAR);

  return {
    id: currentCommentId,
    avatar: `img/avatar-${ randomAvatarIndex }.svg`,
    message: MESSAGE[randonMessageIndex],
    name: NAMES[randomNameIndex]
  };
};

const createPhoto = () => {
  currentPostId++;
  currentUrl++;
  const randomDescriptionIndex = getRandomInteger(0, DESCRIPTION.length - 1);
  const randomLikesIndex = getRandomInteger(MIN_LIKES, MAX_LIKES);

  const generateComments = Array.from({ length: getRandomInteger(0, 30) }, createComments);

  return {
    id: currentPostId,
    url: `photos/${currentUrl}.jpg`,
    description: DESCRIPTION[randomDescriptionIndex],
    likes: randomLikesIndex,
    comments: generateComments
  };
};

const generatePhoto = Array.from({ length: PHOTO_COUNTER }, createPhoto);

const generationAll = () => generatePhoto;

generationAll();
