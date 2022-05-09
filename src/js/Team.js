import Bowerman from './characterСlasses/Bowerman';
import Magician from './characterСlasses/Magician';
import Swordsman from './characterСlasses/Swordsman';
import Daemon from './characterСlasses/Daemon';
import Undead from './characterСlasses/Undead';
import Vampire from './characterСlasses/Vampire';
import {
  generateTeam
} from './generators';

export default class Team {
  constructor() {
    this.allowedTypes = [new Bowerman(1), new Magician(1), new Swordsman(1), new Daemon(1), new Undead(1), new Vampire(1)];
  }

  generateTeam() {
    return generateTeam(this.allowedTypes);
  }
}


