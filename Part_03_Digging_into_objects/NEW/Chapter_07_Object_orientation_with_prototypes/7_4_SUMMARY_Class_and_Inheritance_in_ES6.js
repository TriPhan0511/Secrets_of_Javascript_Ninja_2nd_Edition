/** 7.4.SUMMARY: Class and Inheritance in ES6 */

// Defines a Person class
class Person {
  constructor(name) {
    this.name = name;
  }

  dance() {
    return true;
  }
}

// Defines a Ninja class, which extends the Person class
class Ninja extends Person {
  constructor(name, weapon, skill) {
    super(name);
    this.weapon = weapon;
    this.skill = skill;
  }

  wieldWeapon() {
    return `${this.name} can wield the ${this.weapon}.`;
  }

  // Adds a static method (class-level method)
  static compare(ninja1, ninja2) {
    return ninja1.skill - ninja2.skill;
  }
}

// Creates an instance of Ninja
const yoshi = new Ninja('Yoshi', 'blade', 1);

assert(yoshi instanceof Ninja, 'Our ninja is a ninja.');
assert(yoshi instanceof Person, 'He is also a person.');
assert(yoshi.name === 'Yoshi', 'His name is Yoshi');
assert(yoshi.dance(), 'Because Yoshi is a person, so he enjoys dancing.');
assert(
  yoshi.wieldWeapon() === 'Yoshi can wield the blade.',
  'Of course, he is a ninja, so he can dield a weapon.'
);

// Creates another ninja (for testing the static method Ninja.compare)
const hattori = new Ninja('Hattori', 'blade', 2);
assert(Ninja.compare(yoshi, hattori) < 0, "The Yoshi's skill is less than the Hattori's skill.");
