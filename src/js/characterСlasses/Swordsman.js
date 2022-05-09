import Character from '../Character.js';

export default class Swordsman extends Character {
  constructor(name, type, health, level) {
    super(name, type, health, level);
    this.attack = 40;
    this.defence = 10;
    this.type = 'swordsman';
  }
}
