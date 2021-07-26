/** 7.3 - Achieving inheritance */

/**
 * Inheritance is a form or reuse in which new objects have access to properties of existing
 * objects. This help us avoid the need to repeat code and data across our code base.
 * In Javascript, inheritance works slightly differently than in other popular object-oriented
 * languages.
 *
 * Consider the following listing, in which we attempt to achieve inheritance.
 */

/** Listing 7.7 - Trying to achieve inheritance with prototypes */

// // Defines a dancing Person via a constructor and its prototype
// function Person() {}
// Person.prototype.dance = function () {};

// // Defines a Ninja
// function Ninja() {}
// // Attempts to make Ninja a dancing Person by copying the dance method from the Person prototype
// Ninja.prototype = { dance: Person.prototype.dance };

// const ninja = new Ninja();
// assert(ninja instanceof Ninja, 'ninja receives functionality from the Ninja prototype.');
// assert(ninja instanceof Person, '... and the Person prototype'); // FAILS
// assert(ninja instanceof Object, '... and the Object prototype');

/**
 * Because the prototype of a function is an object, there are multiple ways of copying functionality
 * (such as properties or methods) to effect inheritance. In this code, we define a Person and then
 * a Ninja. And because a Ninja is clearly a person, we want Ninja to inherit the attributes of Person.
 * We attempt to do so by copying the dance property of the Person prototype's method to a similarly
 * named property in the Ninja prototype.
 *
 * Running our test reveals that although we may have taught the ninja to dance, we failed to make the
 * Ninja a Person. We taught the Ninja to mimic the dance of a person, but that hasn't made the Ninja
 * a Person. That's not inheritance - it's just copying.
 */

/**
 * Apart from the fact that this approach isn't exactly working, we'd also need to copy each
 * property of Person to the Ninja prototype individually. That's no way to do inheritance.
 * Let's keep exploring.
 */

/**
 * What we really want to achieve is a prototype chain so that a Ninja can be a Person,
 * and a Person can be a Mammal, and a Mammal can be an Animal, and so on, all the way
 * to Object. The best technique for creating such a prototype chain is to use an instance
 * of an object as the other object's prototype:
 *
 *    SubClass.prototype = new SuperClass();
 * 
 * For example:
 * 
      Ninja.prototype = new Person();
 * 
 * This preserves the prototype chain, because the prototype of SubClass instance will be an
 * instance of SuperClass, which has a prototype with all properties of SuperClass, and which 
 * will in turn have a prototype pointing to an instance of its superclass, and on and on.
 * 
 * In the next listing, we changed listing 7.7 slightly to use this technique. 
 */

/** Listing 7.8 - Achieving inheritance with prototype */

function Person() {}
Person.prototype.dance = function () {};

function Ninja() {}
Ninja.prototype = new Person();

const ninja = new Ninja();
assert(ninja instanceof Ninja, 'ninja receives functionality from the Ninja prototype.');
assert(ninja instanceof Person, '... and the Person prototype.');
assert(ninja instanceof Object, '... and the Object prototype.');
assert(typeof ninja.dance === 'function', 'And he can dance.');

/**
 * Here's the important implication: When we perform an instanceof operation, we can determine
 * whether the object inherits the functionality of any object in its prototype chain.
 */

/**
 * An additional happy side effect of doing prototype inheritance in this manner is that
 * all inherited function prototypes will continue to live-update. Objects that inherit
 * from the prototype alwyas have access to the current prototype properties.
 */

/**
 * NOTE
 * Another technique that may have occured to you, and that we advise strongly against,
 * is to use the Person prototype object directly as the Ninja prototype, like this:
 *
 *    Ninja.prototype = Person.pototype; // NO NO
 *
 * Any changes to the Ninja prototype will then also change the Person prototype (because
 * they're the same object), and that's bound to have undesirable side effects.
 */
