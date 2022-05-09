export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 100;
    this.type = type;
    if (new.target == Character) {
      throw "The class Character cannot be called, only descendants can be called"
    }
  }

  levelUp() {
    if (this.health + 80 > 100) {
      this.health = 100;
    } else {
      this.health = this.health + 80;
    }
    this.attack = this.attack + this.attack * 0.2;
    this.defence = this.defence + this.defence * 0.2;
    this.level++;
  }
}







