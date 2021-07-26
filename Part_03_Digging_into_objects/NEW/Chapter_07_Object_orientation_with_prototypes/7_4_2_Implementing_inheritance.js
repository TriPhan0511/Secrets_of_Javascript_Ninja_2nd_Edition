/** 7.4.2 - Implementing inheritance */

/**
 * To be honest, performing inheritance in pre-ES6 code can be a pain. Let's go back to
 * our trusted Ninja, Person example:
 * 
      function Person() {}
      Person.prototype.dance = function () {};

      function Ninja() {}
      Ninja.prototype = new Person();

      Object.defineProperty(Ninja.prototype, 'constructor', {
        value: Ninja,
        enumerable: false,
        writable: true,
      });
* 
* There's a lot to keep in mind here: Methods accessible to all instances should be 
* added directly to the prototype of the constructor function, as we did with the 
* dance method and the Person constructor. If we want to implement inheritance, we
* have to set the prototype of the derived "class" to the instance of the base
* "class". In this case, we assigned a new instance of Person to Ninja.prototype.
* Unfortunately, this messes up the constructor property, so we have to manually
* restore it with the Object.defineProperty method. This is a lot to keep in mind
* when trying to achieve a relative simple and commonly used feature (inheritance).
* Luckily, with ES6, all of this significantly simplified.
*
* Let's see how it's done in the following listing.
*/

/** Listing 7.15 - Inheritance in ES6 */

// Defines a Person class
class Person {
  constructor(name) {
    this.name = name;
  }

  dance() {
    return true;
  }
}

// Use the extends keyword to inherit from another class
class Ninja extends Person {
  constructor(name, weapon) {
    super(name); // Uses the super keyword to call the base class constructor
    this.weapon = weapon;
  }

  wieldWeapon() {
    return true;
  }
}

// Creates an instance of Person
const person = new Person('Bob');
assert(person instanceof Person, "A person's a person.");
assert(person.dance(), 'A person can dance.');
assert(person.name === 'Bob', 'We can call it by name.');
assert(!(person instanceof Ninja), "But it's not a ninja.");
assert(!('wieldWeapon' in person), 'And it cannot wield a weapon.');

// Creates an instance of Ninja
const ninja = new Ninja('Yoshi', 'Wakizashi');
assert(ninja instanceof Ninja, "A ninja's a ninja.");
assert(ninja.wieldWeapon(), 'That can wield a weapon.');
assert(ninja instanceof Person, "But it's also a person.");
assert(ninja.name === 'Yoshi', 'That has a name.');
assert(ninja.dance(), 'And enjoy dancing.');

/**
 * Listing 7.15 shows how to achieve inheritance in ES6; we use the extends keyword to 
 * inherit from another class:
 * 
      class Ninja extends Person
 * 
 * In this example, we create a Person class with a constructor that assigns a name to each
 * Person instance. We also define a method that will be accessible to all Person instances:
 * 
      class Person {
        constructor(name) {
          this.name = name;
        }

        dance() {
          return true;
        }
      }
 * 
 * Next we define a Ninja class that extends the Person class. It has an additional weapon 
 * property, and a wieldWeapon method:
 * 
      class Ninja extends Person {
        constructor(name, weapon) {
          super(name); // Uses the super keyword to call the base class constructor
          this.weapon = weapon;
        }

        wieldWeapon() {
          return true;
        }
      }
 * 
 * In the constructor of the derived, Ninja class, there's a call to the constructor of the
 * base, Person class, through the keyword super. This should be familiar, if you've worked
 * with any class-based language.
 * 
 * We continue by creating a person instance and checking that it's an instance of the
 * Person class that has a name and can dance. Just to be sure, we also check that a person
 * who isn't a Ninja can't wield a weapon:
 * 
      const person = new Person('Bob');
      assert(person instanceof Person, "A person's a person.");
      assert(person.dance(), 'A person can dance.');
      assert(person.name === 'Bob', 'We can call it by name.');
      assert(!(person instanceof Ninja), "But it's not a ninja.");
      assert(!('wieldWeapon' in person), 'And it cannot wield a weapon.');
 * 
 * We also create a ninja instance and check that it's an instance of Ninja and can wield
 * a weapon. Because every ninja is also a Person, we check that a ninja is an instance of
 * Person, that it has a name, and that it also, in the iterim of fighting, enjoys dancing:
 * 
      const ninja = new Ninja('Yoshi', 'Wakizashi');
      assert(ninja instanceof Ninja, "A ninja's a ninja.");
      assert(ninja.wieldWeapon(), 'That can wield a weapon.');
      assert(ninja instanceof Person, "But it's also a person.");
      assert(ninja.name === 'Yoshi', 'That has a name.');
      assert(ninja.dance(), 'And enjoy dancing.');
 */

/**
 * Theres no need to think about prototypes or the side effects of certain overridden 
 * properties. We define classes and specify their relationship by using the extends
 * keyword.
 */
