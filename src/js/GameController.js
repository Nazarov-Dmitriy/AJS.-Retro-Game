import Team from './Team';
// import Vampire from './characterСlasses/Vampire';
export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  // this.gamePlay.addCellEnterListener(this.gamePlay.onCellEnter) {

  // }



  init() {
    this.gamePlay.drawUi('prairie');
    this.gamePlay.redrawPositions(new Team().generateTeam());

    // document.querySelector('.cell').addEventListener('mouseenter', event => this.onCellEnter(event));
    document.querySelectorAll('.cell').forEach(el => {
      el.addEventListener('mouseenter', (event) => {
        if(event.target.children[0].classList.contains('character')){
          console.log(event.target);
        }
        // console.log(event.target.children[0].classList.contains('character'));

     
        // this.gameplay.addCellEnterListener(this.onCellEnter(event));
      })
    });
    // document.addEventListener('mouseleave', (event) => {
    //   console.log(event.target);
    // })


    // this.gameplay.addEventListener('CellEnter', (e) => {
    //   console.log(e.target);
    // });


    ;
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    console.log(index);
  }

  onCellEnter(index) {
    console.log(index);
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
