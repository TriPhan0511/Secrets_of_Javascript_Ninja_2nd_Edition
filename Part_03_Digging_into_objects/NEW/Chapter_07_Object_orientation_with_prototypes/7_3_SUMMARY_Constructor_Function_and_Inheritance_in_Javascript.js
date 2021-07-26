/** 7.3 - SUMMARY: ConstructorFunction and Inheritance in Javascript */

/** 7.4 - Using Javascript "classes" in ES6 */

// Defines a Person constructor function
function Person() {}
// Adds a dance method to Person prototype
Person.prototype.dance = function () {};

// Defines a Ninja constructor function
function Ninja() {
  this.swung = true;
}
// Assign a new Person() object as the Ninja prototype
Ninja.prototype = new Person();
// Fine-tune the constructor property of Ninja prototype
Object.defineProperty(Ninja.prototype, 'constructor', {
  value: Ninja,
  enumerable: false,
  writable: true,
});
// Adds a swingSword method to Ninja prototype
Ninja.prototype.swingSword = function () {
  return this.swung;
};

// Creates an instance of Ninja
const ninja1 = new Ninja();

// Uses instanceof operator to determine whether
// the prototype of a specified function is in the prototype chain of a specified object
assert(ninja1 instanceof Ninja, 'ninja1 is a Ninja.');
assert(ninja1 instanceof Person, 'ninja1 is also a Person.');

// Tests whether the constructor property of the Ninja prototype points back to the Ninja function
assert(ninja1.constructor === Ninja, 'The constructor property points back to the Ninja function.');

// Tests whether the ninja1 object inherits the properties from the Ninja prototype
assert(ninja1.swingSword(), 'ninja1 can swing a sword.');

// Tests whether the ninja1 object inherits the properties from the Person prototype
assert(typeof ninja1.dance === 'function', 'ninja1 can also dance!');
