import Team from './Team';
import cursors from './cursors';
export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi('prairie');
    this.gamePlay.redrawPositions(new Team().generateTeam());
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this.gamePlay));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this.gamePlay));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this.gamePlay));
  }

  onCellClick(index) {
    let masTypeCharecterPlayer = ['bowman', 'swordsman', 'magician'];
    let choiceCharacterPlayerThis = choiceCharacterPlayer.bind(this);
    let moveNewCellsThis = moveNewCells.bind(this);
    let attackCharacterComputerThis = attackCharacterComputer.bind(this);

    function choiceCharacterPlayer() {
      function removeSelectCell(arr) {
        arr.forEach(item => {
          item.classList.remove('selected', 'selected-yellow');
        });
      }

      if (this.cells[index].children[0] && masTypeCharecterPlayer.includes(this.cells[index].children[0].classList[1])) {
        if (this.cells[index].classList.contains('selected-yellow')) {
          removeSelectCell(this.cells);
        } else {
          removeSelectCell(this.cells);
          this.selectCell(index);
        }
      } else if (!document.querySelector('.selected-yellow')) {
        this.showError('Выберите персонажа своей команды');
      }
    }

    function moveNewCells() {
      if (document.querySelector('.selected-yellow') && this.cells[index].classList.contains('selected-green')) {
        let indexSelected = document.querySelector('.selected-yellow').classList[1];
        this.arrCharacter.forEach(item => {
          if (item.position == indexSelected) {
            this.cells[item.position].classList.remove('selected', 'selected-yellow');
            item.position = index;
            this.cells[index].classList.remove('selected', 'selected-green');
          }
        });
        this.redrawPositions(this.arrCharacter);
      }
    }

    function attackCharacterComputer() {
      if (document.querySelector('.selected-yellow') && this.cells[index].classList.contains('selected-red')) {
        let indexSelected = document.querySelector('.selected-yellow').classList[1],
          attackPlayer = 0,
          defenceComputer = 0,
          damage = 0;

        this.arrCharacter.forEach(item => {
          if (item.position == indexSelected) {
            attackPlayer = item.character.attack;
          }

          if (item.position == index) {
            defenceComputer = item.character.defence;
          }
        });
        damage = Math.max(attackPlayer - defenceComputer, attackPlayer * 0.1);
        let showDamage = this.showDamage(index,damage);
        console.log( this.showDamage(index,damage));
        showDamage.then((responce)=> console.log(responce));
      //  this.showDamage(index,damage).then(
      //    console.log(resolve)
      //  );
      }
    }

    choiceCharacterPlayerThis();
    moveNewCellsThis();
    attackCharacterComputerThis();

    //  else {
    //   if (document.querySelector('.selected-yellow')) {
    //     this.showError('Действие не допустимо');
    //   }
    // }
  }

  onCellEnter(index) {
    let masTypeCharecterPlayer = ['bowman', 'swordsman', 'magician'];

    function backlightStep() {
      let objCountStep = {
        swordsman: 4,
        bowman: 2,
        magician: 1
      }

      let characterSelected = document.querySelector('.selected-yellow').children[0].classList[1],
        step = objCountStep[characterSelected],
        indexSelected = document.querySelector('.selected-yellow').classList[1];

      let selectCellGreen = function () {
        if (!this.cells[index].children[0]) {
          this.selectCell(index, 'green');
          this.setCursor(cursors.pointer)
        }
      }

      function diagonalStep(indexSelected, step) {
        let arrCellsDiagonal = [];
        for (let i = 0; i < step; i++) {
          let rightUp = +indexSelected + (8 * (i + 1)) + i + 1;
          let leftUp = +indexSelected + (8 * (i + 1)) - i - 1;
          let rigthDown = +indexSelected - (8 * (i + 1)) + i + 1;
          let leftDown = +indexSelected - (8 * (i + 1)) - i - 1;


          if (leftUp % 8 >= 0 && leftUp % 8 < indexSelected % 8) {
            arrCellsDiagonal.push(leftUp);
          }
          if (rightUp % 8 > indexSelected % 8 && rightUp % 8 <= 7) {
            arrCellsDiagonal.push(rightUp);
          }
          if (rigthDown % 8 > indexSelected % 8 && rigthDown % 8 <= 7) {
            arrCellsDiagonal.push(rigthDown);
          }
          if (leftDown % 8 >= 0 && leftDown % 8 < indexSelected % 8) {
            arrCellsDiagonal.push(leftDown);
          }
        }
        return arrCellsDiagonal;
      }

      let selectCellGreenThis = selectCellGreen.bind(this);
      diagonalStep(indexSelected, step);

      if (index > indexSelected) {
        let right = index <= +indexSelected + (8 - indexSelected % 8 > step ? step : indexSelected % 8);
        let up = index % 8 == indexSelected % 8 && index <= (+indexSelected + +step * 8);
        let dioganal = diagonalStep(indexSelected, step);

        if (dioganal.includes(index) || up || right) {
          selectCellGreenThis();
        } else {
          this.setCursor(cursors.notallowed)
        }
      } else {
        let left = index >= indexSelected - (indexSelected % 8 < step ? indexSelected % 8 : step);
        let down = index % 8 == indexSelected % 8 && index >= (+indexSelected - +step * 8);
        let dioganal = diagonalStep(indexSelected, step);
        if (dioganal.includes(index) || left || down) {
          selectCellGreenThis();
        } else {
          this.setCursor(cursors.notallowed)
        }
      }
    }

    function backlightAttack() {
      let objCountAttack = {
        swordsman: 1,
        bowman: 2,
        magician: 4
      }

      let characterSelected = document.querySelector('.selected-yellow').children[0].classList[1],
        step = objCountAttack[characterSelected],
        indexSelected = document.querySelector('.selected-yellow').classList[1],
        arrRangeHorisontal = [],
        arrRangeVertical = [];

      let selectCellAttack = function () {
        if (this.cells[index].children[0] && !masTypeCharecterPlayer.includes(this.cells[index].children[0].classList[1])) {
          this.selectCell(index, 'red');
          this.setCursor(cursors.crosshair)
        }
      }

      function arrRange(indexSelected, step) {
        let horisontalStart = 0,
          horisontalEnd = 0,
          versticalStart = 0,
          versticalEnd = 0;

        horisontalStart = +indexSelected % 8 - step >= 0 ? +indexSelected % 8 - step : 0;
        horisontalEnd = +indexSelected % 8 + step <= 7 ? +indexSelected % 8 + step : 7;
        versticalStart = +indexSelected - step * 8 >= 0 ? +indexSelected - step * 8 - step : 0;
        versticalEnd = +indexSelected + step * 8 <= 63 ? +indexSelected + step * 8 + step : 63;
        arrRangeHorisontal.push(horisontalStart, horisontalEnd);
        arrRangeVertical.push(versticalStart, versticalEnd);
      }

      arrRange(indexSelected, step);
      let selectCellAttackThis = selectCellAttack.bind(this);


      if (index % 8 >= arrRangeHorisontal[0] && index % 8 <= arrRangeHorisontal[1] && index >= arrRangeVertical[0] && index <= arrRangeVertical[1]) {
        selectCellAttackThis();
      } else if (!this.cells[index].classList.contains('selected-green')) {
        this.setCursor(cursors.notallowed)
      }
    }



    function showTooltip() {
      if (this.cells[index].children[0]) {
        this.arrCharacter.forEach(item => {
          if (item.position === index) {
            this.showCellTooltip(`🎖 ${item.character.level} ⚔ ${item.character.attack} 🛡 ${item.character.defence} ❤ ${item.character.health}`, index);
          }
        })
      };
    }

    function selectedPlayerCharacter() {
      if (this.cells[index].children[0] && masTypeCharecterPlayer.includes(this.cells[index].children[0].classList[1])) {
        this.cells.forEach((item, i) => {
          if (item.classList.contains('selected') && index !== i) {
            this.setCursor(cursors.pointer)
          }
        });
      };
    }

    let backlightStepThis = backlightStep.bind(this);
    let showTooltipThis = showTooltip.bind(this);
    let selectedPlayerCharacterThis = selectedPlayerCharacter.bind(this);
    let selectCellAttackThis = backlightAttack.bind(this);
    if (document.querySelector('.selected-yellow')) {
      backlightStepThis();
      selectCellAttackThis();
    }

    showTooltipThis();
    selectedPlayerCharacterThis();
  }



  onCellLeave(index) {
    let masTypeCharecterPlayer = ['bowman', 'swordsman', 'magician'];

    function backlightOut() {
      if (this.cells[index].classList.contains('selected-green')) {
        this.cells[index].classList.remove('selected', 'selected-green');
      }
      if (this.cells[index].classList.contains('selected-red')) {
        this.cells[index].classList.remove('selected', 'selected-red');
      }
    }

    function hideTooltip() {
      if (this.cells[index].children[0]) {
        this.arrCharacter.forEach(item => {
          if (item.position === index) {
            this.hideCellTooltip(index);
          }
        })
      };
    }

    if (this.cells[index].children[0] && masTypeCharecterPlayer.includes(this.cells[index].children[0].classList[1])) {
      this.setCursor(cursors.auto);
    };

    let backlightOutStepThis = backlightOut.bind(this);
    let hideTooltipThis = hideTooltip.bind(this);
    backlightOutStepThis();
    hideTooltipThis();
  }
}
