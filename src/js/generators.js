/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
import PositionedCharacter from './PositionedCharacter';

export function* characterGenerator(allowedTypes, maxLevel) {

  return allowedTypes;

}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  let arrPlayerBoard = [];
  let arrComputerBoard = [];
  let result = [];
  let redDrawArr = [];

  function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  for (let i = 0; i < 63; i++) {
    if (i % 8 == 0 || i % 8 == 1) {
      arrPlayerBoard.push(i)
    }
    if (i % 8 == 7 || i % 8 == 6) {
      arrComputerBoard.push(i)
    }
  }

  function generatorPlayer(characterCount) {
    for (let i = 0; i < characterCount; i++) {
      let randomCharcter = allowedTypes[random(0, 2)];
      let positionCharcter = arrPlayerBoard[random(0, arrPlayerBoard.length - 1)];
      result.forEach(item => {
        if (item[1] == positionCharcter) {
          arrPlayerBoard.splice(arrPlayerBoard.indexOf(positionCharcter), 1);
          positionCharcter = arrPlayerBoard[random(0, arrPlayerBoard.length - 1)];
        }
      });
      result.push([randomCharcter, positionCharcter]);
    }
  }

  function generatorComputer(characterCount) {
    for (let i = 0; i < characterCount; i++) {
      let randomCharcter = allowedTypes[random(3, 5)];
      let positionCharcter = arrComputerBoard[random(0, arrComputerBoard.length - 1)];
      result.forEach(item => {
        if (item[1] == positionCharcter) {
          arrComputerBoard.splice(arrComputerBoard.indexOf(positionCharcter), 1);
          positionCharcter = arrComputerBoard[random(0, arrComputerBoard.length - 1)];
        }
      });
      result.push([randomCharcter, positionCharcter])
    }
  }

  generatorPlayer(2);
  generatorComputer(2);

  result.forEach(item => {
    redDrawArr.push(new PositionedCharacter(item[0], item[1]))
  });
  
  return redDrawArr;
}



// Напишите реализацию для генератора characterGenerator и функции generateTeam (модуль generators) с учётом правил, описанных в разделе Генерация персонажей.

// Обратите внимание: обе функции на вход должны принимать массив (или iterable) из классов (не строковых названий, а именно классов).
