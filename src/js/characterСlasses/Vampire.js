import Character from '../Character.js';

export default class Vampire extends Character {
  constructor(name, type, health, level) {
    super(name, type, health, level);
    this.attack = 25;
    this.defence = 25;
    this.type = 'vampire';
  }
}
