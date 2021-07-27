/** 8.1.1 - Defining getters and setters */

/**
 * In Javascript, getter and setter methods can be defined in two ways:
 *
 * _  By specifying them within object literals or within ES6 class definitions.
 *
 * _  By using the built-in Object.defineProperty method.
 */

/**
 * Explicit support for getters and setters has existed for quite some time now, since the days
 * of ES5. As always, let's explore the syntax through an example. In this case, we have an
 * object storing a list of ninjas, and we want to able to get and set the first ninja in the list.
 */

/** Listing 8.2 - Defining getters and setters in object literals */

// const ninjaCollection = {
//   ninjas: ['Yoshi', 'Hattori', 'Hanzo'],

//   // Defines a getter method for the firstNinja property that
//   // returns the first ninja in our collection and logs a message.
//   get firstNinja() {
//     report('Getting the first ninja.');
//     return this.ninjas[0];
//   },

//   // Defines a setter method for the firstNinja property that
//   // modifies the first ninja in our collection and logs a message.
//   set firstNinja(value) {
//     report('Setting the first ninja');
//     this.ninjas[0] = value;
//   },
// };

// // Accesses the firstNinja property as if it were a standard object property.
// assert(ninjaCollection.firstNinja === 'Yoshi', 'The first ninja is Yoshi.');

// // Modifies the firstNinja property as if it were a standard object property.
// ninjaCollection.firstNinja = 'Peter';

// // Tests that the property modification is stored.
// assert(
//   ninjaCollection.firstNinja === 'Peter' && ninjaCollection.ninjas[0] === 'Peter',
//   'Now Peter is the first ninja.'
// );

// // // List all properties in ninjaCollection object
// // for (let prop in ninjaCollection) {
// //   report(prop);
// // }
// // // -> ninjas
// // // -> firstNinja

/**
 * As you can see, we define a getter property by prefixing the name with a get keyword,
 * and a setter property with a set keyword.
 */

/**
 * As an important point to take from all this is that native getters and setters allow us to
 * specify properties that are accessed as standard properties, but that are methods whose
 * execution is triggered immidiately when the property is accessed.
 */
// ----------------------------------------------------------------------------------------------------

/**
 * This syntax for defining a getter and setter is straightforward, so it's no wonder that we
 * can use the exact same syntax to define getters and setters in other situations. The following
 * example uses ES6 classes.
 */

/** Listing 8.3 - Using getters and setters in ES6 classes */

// class NinjaCollection {
//   constructor() {
//     this.ninjas = ['Yoshi', 'Hattori', 'Hanzo'];
//   }

//   get firstNinja() {
//     report('Getting the first ninja.');
//     return this.ninjas[0];
//   }

//   set firstNinja(value) {
//     report('Setting the first ninja.');
//     this.ninjas[0] = value;
//   }
// }

// const ninjaCollection = new NinjaCollection();

// assert(ninjaCollection.firstNinja === 'Yoshi', 'The first ninja is Yoshi.');

// ninjaCollection.firstNinja = 'Peter';
// assert(
//   ninjaCollection.firstNinja === 'Peter' && ninjaCollection.ninjas[0] === 'Peter',
//   'Now Peter is the first ninja.'
// );

/**
 * This modifies the code from listing 8.2 to include ES6 classes. We keep all the test to
 * verify that the example still works as expected.
 */

/**
 * NOTE
 * We don't always have to define both getter and setter for a given property.
 * For example, often we'll want to provide only a getter. If in that case we
 * still attempt to write a value to that property, the exact behavior depends
 * on whether the code in in strict or nonstrict mode. If the code is in
 * nonstrict mode, assigning a value to a property with only a getter achieves
 * nothing; the Javacript engine will silently ignore our request. If,
 * on other hand, the code is in strict mode, the Javascript engine will throw
 * a type error, indicating that we're trying to assign a value to a property
 * that has a getter but no setter.
 */
// ----------------------------------------------------------------------------------------------------

/**
 * Although specifying getters and setters through ES6 classes and object literals is easy,
 * you've probably noticed something missing. Traditionally, getters and setters are used to
 * control access to private object properties, as in listing 8.1. Unfortunately, as we
 * already know from the chapter 5, Javascript doesn't have private object properties.
 * Instead, we can mimic them through closures, by defining variables and specifying
 * object methods that will close over those variables. Because with object literal and
 * classes our getter and setter methods aren't created within the same function scope as
 * variables that we could use for private object properties, we can't do this. Luckily,
 * there's an alternative way, through the Object.defineProperty method.
 */

/**
 * In chapter 7, you saw that the Object.defineProperty method can be used to define
 * new properties by passing in a property descriptor object. Among other things, the
 * property descriptor can include a get and set property that define the property's
 * getter and setter methods.
 *
 * We'll use this feature to modify listing 8.1 to implement built-in getters and setters
 * that control accsess to a "private" object property, as shown in the following listing.
 */

/** Listing 8.4 - Defining getters and setters with Object.defineProperty */

// // Defines a constructor function
// function Ninja() {
//   // Defines a "private" variable that will be accessible through function closures
//   let _skillLevel = 0;

//   // Uses the built-in Object.defineProperty to define a skillLevel property
//   Object.defineProperty(this, 'skillLevel', {
//     // A get method that will be called whenever we read the skillLevel property
//     get: () => {
//       report('The get method is called.');
//       return _skillLevel;
//     },
//     // A set method that will be called whenever we assign a value to the skillLevel property
//     set: (value) => {
//       report('The set method is called.');
//       _skillLevel = value;
//     },
//   });
// }

// // Creates a new Ninja instance
// const ninja = new Ninja();

// // The private variable isn't accessible directly, but through the skillLevel getter
// assert(typeof ninja._skillLevel === 'undefined', 'We cannot acces a "private" variable.');
// assert(ninja.skillLevel === 0, 'The getter works fine!');

// // The set method implicitly called when assigning to the skillLevel property
// ninja.skillLevel = 10;
// assert(ninja.skillLevel === 10, 'The value was updated.');

/**
 * Notice that, unlike getters and setters specified on object literal and classes, the
 * get and set methods defined through Object.defineProperty are created in the same scope
 * as the "private" _skillLevel variable. Both methods create a closure around the private
 * variable, and we can access that private variable only through these methods.
 */

/**
 * As you can see, the approach with Object.defineProperty is more verbose and complicated
 * than getters and setters in object literals and ES6 classes. But in certain cases, when
 * we need private object properties, it's well worth it.
 */

/**
 * Regardless of the way we define them, getters and setters allow us to define object
 * properties that are used like standard object properties, but are methods that can
 * execute additional code whenever we read or write to a particular property. This is
 * an incredibly useful feature that enables us to perform logging, validate assigment values,
 * and even notify other parts of the code when certain changes occur. Let's explore some of
 * these applications.
 */
