/** 7.2.1 - Instance properties */

/**
 * When the function is called as a constructor via the new operator, its context is defined
 * as the new object instance. In addition to exposing properties via the prototype, we can
 * initialize values within the constructor function via the this parameter.
 *
 * Let's examine the creation of such instance properties in the next listing.
 */

/** Listing 7.3 - Observing the precedence if initialization activities */

function Ninja() {
  // Creates an instance variable that holds a Boolean value initialized to false
  this.swung = false;
  // Creates an instance method that returns the inverse of the swung instance variable value
  this.swingSword = function () {
    return !this.swung;
  };
}

// Defines a prototype method with the same name as instance method.
// Which will take precedence?
Ninja.prototype.swingSword = function () {
  return this.swung;
};

// Constructs a Ninja instance and asserts that the instance method
// will override the prototype method of the same name
const ninja = new Ninja();
assert(ninja.swingSword(), 'Called the instance method, not the prototype method.');

/**
 * NOTE:
 * This isn't anything we'd advise doing in the real-world code; quite opposite.
 * We're doing it here just to demonstrate the precedence of properties.
 */

/**
 * When you run the test, you see that it passes! This shows that instance members will
 * hide properties of the same name defined in the prototype.
 */

/**
 * Within the constructor function, the this keyword refers to the newly created object,
 * so the properties added within the constructor are created directly on the new ninja
 * instane. Later, when we access the property swingSword on ninja, there's no need to
 * traverse the prototype chain; the property created within the constructor is
 * immediately found and returned.
 */

/**
 * This has an interesting side effect.
 *
 * For example, we create three ninja instances:
 * Every ninja instance gets its own version of the properties that were created within
 * the constructor, while they have access to the same prototype's properties. This is
 * okay for value properties (for example, swung) that are specific to each object instance.
 * But in certain cases it might be problematic for methods.
 *
 * In this example, we'd have three version of the swingSword method that all perform the
 * same logic. This isn't a problem if we create a couple of objects, but it's something to
 * pay attention to if we plan to create large number of objects. Because each method copy
 * behave the same, creating multiple copies often doesn't make sense, because it only
 * consumes more memory. From that perspective, it makes sense to place object methods only
 * on the function's prototype, because in that way we have a single method shared by all
 * object instances.
 */

/**
 * NOTE:
 * Remember chapter 5 on closures: Methods defined within constructor function allow us
 * to mimic private object variables. If this is something we need, specifying methods
 * within constructors is the only way to go.
 */
