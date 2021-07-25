/** 7.2 - Object construction and prorotypes */

// // Creates an empty object
// // Populates with properties via assigment statements
// const warrior = {};
// warrior.name = 'Saito';
// warrior.occupation = 'marksman';

/**
 * If we're going to create mutiple instances of the same type of object,
 * assigning the properties individually isn't only tedious but also highly error-prone.
 * We'd like to be able to consolidate the set of properties and methods for a class of
 * objects in one place.
 *
 * Javascript provides such a mechanism, though in a different form than most other
 * language. Like object-oriented languages such as Java and C#, Javascript employs
 * the new operator to instantiate new objects via constructors, but there's no true class
 * definition in Javascript. Instead, the new operator, applied to a constructor function,
 * triggers the creation of a newly allocated object.
 */

/**
 * What we didn't learn in the previous chapters was that every function has a prototype object
 * that's automatically set as the prototype of the objects created with that function.
 *
 * Let's see how that works in the following listing.
 */

/** Listing 7.2 - Creating a new instance with a prototyped method */

// Defines a function that does nothing and returns nothing
function Ninja() {}
// Every function has a built-in prototype object, which we can freely modify
Ninja.prototype.swingSword = function () {
  return true;
};

// Calls the function as a function.
const ninja1 = Ninja();
// Testing confirms  that nothing at all seems to happen.
assert(ninja1 === undefined, 'No instance of Ninja created.');

// Calls the function as a constructor
const ninja2 = new Ninja(); // NOTE: Using the keyword: new
// Testing confirms that not only is a new object instance created,
// but it possesses the method from the prototype of the function.
assert(
  ninja2 && ninja2.swingSword && ninja2.swingSword(),
  'Instance exists and method is callable.'
);

/**
 * In this code, we define a seemingly do-nothing function named Ninja that we'll
 * invoke in two ways: as a "normal" function, const ninja1 = Ninja(); and as a
 * constructor, const ninja2 = new Ninja();
 * 
 * When the function is created, it immediately gets a new object assigned to its 
 * prototype object, an object that we can extend just like any other object. In
 * this case, we add a swingSword method to it:
 * 
      Ninja.prototype.swingSword = function(){
        return true;
      }
 * 
 * The we put the function through its paces. First we cal the function normally and 
 * store its result in variable ninja1. Looking at the function body, we see that it 
 * returns no value, so we'd expect ninja1 to test as undefined, which we assert to 
 * be true. As a simple function, Ninja doesn't appear to be all that useful.
 */

/**
 * Then we call the function via the new operator, invoking it as a constructor, and
 * something completely different happens. The function is once again called, but this
 * time a newly allocated object has been created and set as the context of the function
 * (and is accessible through the this keyword). The result returned from the new
 * operator is a reference to this new object. We then test that ninja2 has a reference
 * to the newly created object, and that object has a swingSword method that we can call.
 */
// ---------------------------------------------------------------------------------------

/**
 * A function, when created, gets a new object that's assigned to its prototype property.
 * The prototype object initially has only one property, constructor, that reference back
 * to the function (we'll revisit the constructor property later).
 */

// assert(
//   'constructor' in Ninja.prototype,
//   'Initially, the prototype object of a function has only constructor property.'
// );

/**
 * When we use a function as a constructor (for example, by calling new Ninja()), the
 * prototype of the newly constructed object is set to the object referenced by the
 * constructor function's prototype.
 */

// assert(
//   Object.getPrototypeOf(ninja2) === Ninja.prototype,
//   'The protype of ninja2 object is the prototype object of Ninja function.'
// );

// assert(
//   ninja2.__proto__ === Ninja.prototype,
//   'Again, the prototype of ninja2 object is the prototype object of Ninja function.'
// );

// So, two properties, one is Ninja function's prototype property, and the other is
// ninja2 object's __proto__ property, refer to the same object.

/**
 * In this example, we've extended the Ninja.prototype with the swingSword method,
 * and when the ninja2 object is created, its prototype property is set to
 * Ninja's prototype. Therefore, when we try to access the swingSword property
 * on ninja2, the search for that property is delegated to the Ninja prototype object.
 * Notice that all objects created with the Ninja constructor will have access to the
 * swingSword method. Now that's code reuse!
 */

/**
 * The swingSword method is a property of the Ninja's prototype, and not a property of
 * ninja instances. Let's explore this difference between instance properties and
 * prototype properties.
 */


