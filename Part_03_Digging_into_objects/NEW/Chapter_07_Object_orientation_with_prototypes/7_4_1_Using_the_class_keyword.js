/** 7.4.1 - Using the class keyword */

/**
 * ES6 introduces a new class keyword that provides a much more elegant way of creating
 * objects and implementing inheritance than manually implementing it ourselves with
 * prototypes. Using the class keyword is easy, as shown in the following listing.
 */

/** Listing 7.13 - Creating a class in ES6 */

// // Uses the class keyword to start specifying an ES6 class
// class Ninja {
//   // Defines a constructor function that will be called when
//   // we call the class with the keyword new
//   constructor(name) {
//     this.name = name;
//   }

//   // Defines an additional method accessible to all Ninja instances
//   swingSword() {
//     return true;
//   }
// }

// // Instantiates a new ninja object with the keyword new
// const ninja = new Ninja('Yoshi');

// // Tests for the expected behaviors
// assert(ninja instanceof Ninja, 'Our ninja is a Ninja.');
// assert(ninja.name === 'Yoshi', 'named Yoshi.');
// assert(ninja.swingSword(), 'and he can swing a sword.');

/**
 * Listing 7.13 shows tha we can create a Ninja class by using the class keyword. When
 * creating ES6 classes, we can explicitly define a constructor function that will be
 * invoked when instantiating a Ninja instance.
 *
 * In the constructor's body, we can access the newly created instance with
 * the this keyword, and we can easily add new properties, such as the name property.
 *
 * Within the class body, we can also define methods that will be accessible to all
 * Ninja instances. In this case, we've defined a swingSword method that returns true:
 *
      class Ninja {
        constructor(name) {
          this.name = name;
        }

        swingSword() {
          return true;
        }
      }
 * 
 * Next we create a Ninja instance by calling the Ninja class with the keyword new,
 * just as we would if Ninja was a simple constructor function (as earlier in the chapter):
 * 
      const ninja = new Ninja('Yoshi');
 * 
 * Finally, we can test that the ninja instance behaves as expected, that it's an instanceof
 * Ninja, has a name property, and has access to the swingSword method:
 * 
      assert(ninja instanceof Ninja, 'Our ninja is a Ninja.');
      assert(ninja.name === 'Yoshi', 'named Yoshi.');
      assert(ninja.swingSword(), 'and he can swing a sword.');
 */
// ------------------------------------------------------------------------------------------------------

/** CLASSES ARE SYNTATIC SUGAR */

/**
 * As mention earlier, even though ES6 has introduced the class keyword, under the hood we're
 * still dealing with good old prototypes; classes are syntatic sugar designed to make our
 * lives a bit easier when mimicking classes in Javascript.
 * 
 * Our class code from the listing 7.13 can be translated to functionally identical ES5 code:
 * 
        function Ninja(name) {
          this.name = name;
        }

        Ninja.prototype.swingSword = function () {
          return true;
        };

 * 
 * As you can see, there's nothing especially new with ES6 classes. The code more elegant,
 * but the same concepts are applied.       
 */
// ------------------------------------------------------------------------------------------------------

/** STATIC METHODS */

/**
 * In the previous examples, you saw how to define object methods (prototype methods),
 * accessible to all object instances. In addition to such methods, classical
 * object-oriented languages such as Java use static methods, methods defined on
 * class level.
 *
 * Check out the following example:
 */

// class Ninja {
//   constructor(name, level) {
//     this.name = name;
//     this.level = level;
//   }

//   swingSword() {
//     return true;
//   }

//   // Uses the static keyword to make a static method
//   static compare(ninja1, ninja2) {
//     return ninja1.level - ninja2.level;
//   }
// }

// const ninja1 = new Ninja('Yoshi', 4);
// const ninja2 = new Ninja('Hattori', 3);

// // ninja instances don't have access to compare.
// assert(
//   !('compare' in ninja1) && !('compare' in ninja2),
//   "A ninja instance doesn't know how to compare."
// );

// // The class Ninja has access to the compare method.
// assert(Ninja.compare(ninja1, ninja2) > 0, 'The Ninja class can do the comparison!');

// assert(!('swingSword' in Ninja), 'The Ninja class cannot swing a sword.');

/**
 * We again create a Ninja class that has a swingSword method accessible from all ninja
 * instances. We also define a static method, compare, by prefixing the method name
 * with the keyword static.
 * 
      static compare(ninja1, ninja2) {
        return ninja1.level - ninja2.level;
      }
 * 
 * The compare method, which compares the skill levels of two ninjas, is defined on the class
 * level, and not the instance level! Later we test that this effectively means that the compare
 * method isn't accessible from ninja instances but is accessible from the Ninja class:
 * 
      assert(
        !('compare' in ninja1) && !('compare' in ninja2),
        "A ninja instance doesn't know how to compare."
      );

      assert(Ninja.compare(ninja1, ninja2) > 0, 'The Ninja class can do the comparison!');
 */

/**
 * We can also look at how "static" methods can be implemented in pre-ES6 code. For this,
 * we have to remember only that classes are implemented through functions. Because static
 * methods are class-level methods, we can implement them by taking advantage of function
 * as first-class objects, and adding a method property to our constructor function, as in
 * the following example:
 * 
        function Ninja(name, skill) {
          this.name = name;
          this.skill = skill;
        }

        Ninja.compare = function (ninja1, ninja2) {
          return ninja1.skill - ninja2.skill;
        };
 * 
 * 
 */

function Ninja(name, skill) {
  this.name = name;
  this.skill = skill;
}

Ninja.prototype.swingSword = function () {
  return true;
};

Ninja.compare = function (ninja1, ninja2) {
  return ninja1.skill - ninja2.skill;
};

const ninja1 = new Ninja('Yoshi', 4);
const ninja2 = new Ninja('Hattori', 3);

assert(!('compare' in ninja1) && !('compare' in ninja2), 'yes.');
assert(Ninja.compare(ninja1, ninja2) > 0, 'yes..');
assert(!('swingSword' in Ninja), 'yes...');

/** Now let's move on to inheritance */
