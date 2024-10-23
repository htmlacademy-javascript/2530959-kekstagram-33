const checkLengthString = function(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};
console.log(checkLengthString('проверяемая строка', 18));

const reverse = function(string) {
  let revstr = '';
  for (let i = string.length - 1; i >= 0; i--) {
    revstr += string[i];
  }
  return revstr;
};
const polydrom = function(string) {
  revstr = reverse(string);
  if (revstr === string) {
    return true;
  } else {
    return false;
  }
};
console.log(polydrom('довод'));

function extractNumbers(str) {
  let numbers = '';
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) {
      numbers += str[i];
    }
  }
  return numbers;
}
console.log(extractNumbers('агент 007'));
