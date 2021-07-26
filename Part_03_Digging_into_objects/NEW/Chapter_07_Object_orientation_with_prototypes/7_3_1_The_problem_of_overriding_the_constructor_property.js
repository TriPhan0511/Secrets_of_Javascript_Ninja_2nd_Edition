/** 7.3.1 - The problem of overriding the constuctor property */

/**
 * If we take a closer look at the previous example (listing 7.8), we'll see that by setting
 * the new Person object as a prototype of the Ninja constructor function, we've lost our
 * connection to the Ninja constructor that was previously kept by the original Ninja prototype.
 * This is a problem, because the constructor property can be used to determine the function
 * with which the object was created. Somebody using your code could make a perfectly reasonable
 * assumption that the following test will pass:
 * 
      assert((ninja.constructor = Ninja), 'The ninja object was created by the Ninja constructor.');
 * 
 * But in the current state of the application, this test fails. If we search the ninja object for
 * constructor property, we won't find it. So we go over for its prototype, which also doesn't have
 * a constructor property, and again, we follow the prototype and end up in the prototype object of
 * Person, which has a constructor property referencing the Person function. In effect we get the
 * wrong answer: If we ask the ninja object which function has constructed it, we'll get Person as
 * the answer. This can be the source of some serious bugs.
 * 
 * It's up to us fix this situation! But before we can do that, we have to take a detour and see
 * how Javascript enables us to configure properties.
 */
// ---------------------------------------------------------------------------------------------------

/** CONFIGURING OBJECT PROPERTIES */

/**
 * In Javascript, every object property is described with a property descriptor through which
 * wa can configure the following keys:
 *
 *   _ configurable - If set to true, the property's descriptor can be changed and the property
 *     can be deleted. If set to false, we can do neither of these things.
 *
 *   _ enumerable - If set to true, the property shows up during a for-in loop over the object's
 *     properties.
 *
 *   _ value - Specifies the value of the property. Defaults to undefined.
 *
 *   _ writable - If set to true, the property value can be changed by using an assignment.
 *
 *   _ get - Defines the getter function, which will be called when access the property. Can't be
 *     defined in conjunction with value and writable.
 *
 *   _ set - Defines the setter function, which will be called whenever an assignment is made to
 *     the property. Also can't be defined in conjunction with value and writable.
 */

/**
 * Say we create a property through a simple assignment, for example:
 * 
          ninja.name = 'Yoshi';
 * 
 * This property will be configurable, enumerable, and writable, its value will be set to Yoshi,
 * and functions get and set would be undefined.
 */

/**
 * When we want to fine-tune our property configuration, we can use the built-in
 * Object.defineProperty method, which takes an object on which the property will be defined,
 * then name of the property, and a property descriptor object. As an example, take a look at
 * the following code.
 */

/** Listing 7.9 - Configuring properties */

// // Creates an empty object;
// // uses assignments to add two properties
// let ninja = {};
// ninja.name = 'Yoshi';
// ninja.weapon = 'kusarigama';

// // The built-in Object.defineProperty method is used to fine-tune the property configuration details.
// Object.defineProperty(ninja, 'sneaky', {
//   configurable: false,
//   enumerable: false,
//   value: true,
//   writable: true,
// });

// assert('sneaky' in ninja, 'We can access the new property.');

// // Use the for-in loop to iterate over ninja's enumerable properties
// for (let prop in ninja) {
//   assert(prop !== undefined, `An enumerated property: ${prop}`);
// }
// // -> An enumerated property: name
// // -> An enumerated property: weapon

/**
 * By setting enumerable to false, we can be sure that the property won't appear when using the
 * for-in loop. To understand why we'd want to do something like this, let's go back to the original problem.
 */
// ---------------------------------------------------------------------------------------------------

/** FINALLY SOLVING THE PROBLEM OF OVERRIDING THE CONSTRUCTOR PROPERTY */

/**
 * When trying to extend Person with Ninja (or to make Ninja a subclass of Person), we
 * ran into the foolowing problem: When we set a new Person object as a prototype to the
 * Ninja constructor, we lose the original Ninja prototype that keeps our constructor
 * property. We don't want to lose the constructor property, because it's useful for
 * determining the function used to create our object instances and it might be expected
 * by other developers working on our code base.
 *
 * We can solve this problem by using the knowledge that we've just obtained. We'll
 * define a new constructor property on the new Ninja.prototype by using the
 * Object.defineProperty method.
 *
 * See the following listing.
 */

/** Listing 7.10 - Fixing the constructor property problem */

// function Person() {}
// function Ninja() {}
// Ninja.prototype = new Person();

// const ninja1 = new Ninja();
// assert(
//   ninja1.constructor !== Ninja,
//   'The constructor property does not reference the Ninja function.'
// );

// // Uses the Object.defineProperty to fine-tune the constructor property
// Object.defineProperty(Ninja.prototype, 'constructor', {
//   configurable: false,
//   enumerable: false,
//   value: Ninja,
// });

// assert(
//   ninja1.constructor === Ninja,
//   'Now, the constructor property references the Ninja function.'
// );

// function Person() {}
// Person.prototype.dance = function () {};

// function Ninja() {}
// Ninja.prototype = new Person();

// // We define a new non-enumerable constructor property pointing back to Ninja.
// Object.defineProperty(Ninja.prototype, 'constructor', {
//   enumerable: false,
//   value: Ninja,
//   writable: true,
// });

// let ninja = new Ninja();
// // We've reestablished the connection.
// assert(
//   ninja.constructor === Ninja,
//   'Connection from ninja instances to Ninja constructor reestablished!'
// );

// // We haven't added any enumerable properties to the Ninja.prototype.
// for (let prop in Ninja.prototype) {
//   assert(prop !== undefined, `${prop}`);
// }
// // -> dance  // (only one)

/**
 * Now if we run the code, we'll see that everything is peachy. We've reestablished the connection
 * between ninja instances and Ninja constructor function, so we can know that they were
 * constructed by the Ninja function. In addtion, if anybody tries to loop through the properties
 * of the Ninja.prototype object, we've made sure that our patched-on property constructor won't
 * be visited. Now that's the mark of a true ninja; we went in, did our job, and got out, without
 * anybody noticing anything from the outside!
 */

