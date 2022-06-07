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
    this.allowedTypes = [new Bowerman(), new Magician(), new Swordsman(), new Daemon(), new Undead(), new Vampire()];
  }

  generateTeam() {
    return generateTeam(this.allowedTypes);
  }
}


