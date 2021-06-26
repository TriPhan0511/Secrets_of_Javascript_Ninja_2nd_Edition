/**
 * 07.2 - Object construction and prototypes
 */

/**
 * Now we have a basic idea of how the search for a particular property occurs through
 * the prototype chain, let's see how prototypes are used when constructing new objects
 * with constructor functions.
 */

/**
 * Like object-oriented languages such as Java and C++, Javascript employs the new operator to
 * instantiate new objects via constructors, but there's no true class definition in Javascript.
 * Instead, the new operator, aplied to a constructor function, triggers the creation of
 * a newly allocated object.
 */

/**
 * Every function has a prototype object that's set as the prototype of the objects created with
 * that function.
 */

/**
 * Listing 7.2 - Creating a new instance with a prototyped method
 */

// Define a function that does nothing and returns nothing
function Ninja() {}

// // Every function has a built-in prototype object, which we can freely modify
// Ninja.prototype.swingSword = function () {
//   return true;
// };

// // Calls the function as function
// let ninja1 = Ninja();
// // Testing confirms that nothing at all seems to happen
// assert(ninja1 === undefined, 'No instances of Ninja created.');

// Calls the function as a constructor
// let ninja2 = new Ninja();
// Testing confirms that not only is a new object instance created, but it possesses the method
// from the prototype of function
// assert(
//   ninja2 && ninja2.swingSword && ninja2.swingSword(),
//   'Instance exists and method is callable.'
// );

/**
 * When the function is created, it immediately gets a new object assigned to its prototype object,
 * an object that we can EXTEND like any other object.
 */

/**
 * A function, when created, gets a new object that assigned to its prototype property.
 * The prototype object initialy has only one property, constructor, that references back to the function.
 */

// assert(
//   Ninja.prototype.constructor === Ninja,
//   "The function's prototype's constructor property references back to the function."
// );

/**
 * When we use a function as a constructor (for example, by calling new Ninja()), the prototype of the newly
 * constructed object is set to the object referenced by the constructor function's prototype.
 */

// assert(
//   Object.getPrototypeOf(ninja2) === Ninja.prototype,
//   'The prototype of ninja2 is Ninja.prototype'
// );

/**
 * In this example, we've extend the Ninja.prototype with the swingSword method, and when the ninja2 is created,
 * its prototype property is set to Ninja's prototype. Therefore, when we try to access the swingSword property
 * on ninja2, the search for the property is delegated to the Ninja prototype object.
 * Notice that ALL objects created with the Ninja constructor will have access to the swingSword method. Now
 * that's code reuse!
 */

/**
 * The swingSword method is the property of the Ninja's prototype, and not the property of ninja instances.
 * Let's explore this difference instance properties and prototype properties.
 */
// -------------------------------------------------------------------------------------------------

/**
 * 07.2.1 - Instance properties
 */

/**
 * When the function is called as a constructor via the new operator, its context is defined as
 * the new object instance. In addition to exposing properties via the prototype, we can initialize values
 * within the constructor function via the this parameter.
 */

/**
 * Listing 7.3 - Observing the precedence of initialization activities
 */

// function Ninja() {
//   // Creates an instance variable that holds a Boolean value initialized to false
//   this.swung = false;
//   // Creates an instance method that return the inverse of the swung instance variable value
//   this.swingSword = function () {
//     return !this.swung;
//   };
// }

// Defines a prototype method with the same name as the instance method.
// Which will take precedence?
// Ninja.prototype.swingSword = function () {
//   return this.swung;
// };

// Constructs a Ninja instance and asserts that the instance method will overide the prototype method
// of the same name
// let ninja = new Ninja();
// assert(ninja.swingSword(), 'Called the instance method, not the prototype method.');

/**
 * NOTE: This isn't anything we'd advise doing in real-world code; quite the opposite. We're doing it
 * here just to demonstrate the precedence of properties.
 */

/**
 * Within the constructor function, the this keyword refers to the newly created object, so the properties
 * added within the constructor are created directly on the new ninja instance. Later, when we access the
 * property swingSword on ninja, there's no need to traverse the prototype chain; the property created within
 * the constructor is immediately found and returned.
 */

/**
 * Every ninja instances get its own version of the properties that were created within the constructor, while
 * they all have access to the same prototype's properties. This is okay for value properties (for example, swung)
 * that are specific to each object instance. But in certain cases it might be problematic for methods.
 */

/**
 * In this example, we'd have three versions of the swingSword method that all perform the same logic.
 * This isn't a problem if we create a couple of objects, but it's something to pay attention to if we
 * plan to create a large number of objects. Because each method copy behaves the same, creating multiple copies
 * often doesn't make sense, because it only consumes more memory. Sure, in general, the Javascript engine might
 * perform some optimizations, but that's not something to rely on. From that perspective, it makes sense to
 * place object methods only on the function's prototype, because in that way we have a single method shared by
 * all object instances.
 */

/**
 * NOTE: Remember chapter 5 on closures: Methods defined within constructor functions allow us to mimic
 * private object variables. If this is something we need, specifying methods within constructors is
 * the only way to go.
 */
// -------------------------------------------------------------------------------------------------

/**
 * 7.2.2 - Side effects of the dynamic nature of Javascript
 */

/**
 * You've already seen that Javascript is a dynamic language in which properties can be easily added,
 * removed, and modified at will. The same thing for prototypes, both function prototypes and
 * object prototypes.
 */

/**
 * Listing 7.4 - With prototypes, everything can be changed at runtime
 */

// Defines a constructor that creates a Ninja with a single Boolean property
// function Ninja() {
//   this.swung = true;
// }

// Creates an instance of Ninja by calling the construtor function via the "new" operator
// const ninja = new Ninja();

// Adds a method to the prototype after the object has been created
// Ninja.prototype.swingSword = function () {
//   return this.swung;
// };

// Shows that method exists in the object
// assert(ninja.swingSword(), 'Method exists, even out of order.');

// Completely overrides the Ninja's prototype with a new object via the pierce method
// Ninja.prototype = {
//   pierce: function () {
//     return true;
//   },
// };

// Even though we've completely replaced the Ninja constructor's prototype,
// our Ninja can still swing a sword, because it keeps a reference to the old Ninja prototype.
// assert(ninja.swingSword(), 'Our ninja can still swing!');

// Newly created ninjas reference the new prototype, so they can pierce but can't swing.
// const ninja2 = new Ninja();
// assert(ninja2.pierce(), 'Newly created ninjas can pierce');
// assert(!ninja2.swingSword, 'But they cannot swing');
// -------------------------------------------------------------------------------------------------

/**
 * 7.2.3 - Object typing via constructors
 */

/**
 * Although it's great to know how Javascript uses the prototype to find the correct property references,
 * it's also handy to know which function constructed an object instance.
 * As you've seen earlier, the constructor of an object instance is available via the constructor property
 * of the constructor function prototype
 */

// // Constructor
// function Ninja() {}

// // Creates an instance of Ninja
// let ninja = new Ninja();

// // Shows the function constructed of ninja
// assert(
//   Object.getPrototypeOf(ninja).constructor === Ninja,
//   'Ninja constructor function is the function constructed of ninja instance'
// );

/**
 * By using the constructor property, we can access the function that was used to created the object.
 * This information can be used as a form of type checking, as shown in the next listing.
 */

/**
 * Listing 7.5 - Examining the type of an instance and its constructor
 */

// Defines a constructor
// function Ninja() {}
// Creates an instance of Ninja
// const ninja = new Ninja();

// Tests the type of ninja via typeof operator.
// This tells us it's an object, but not much else.
// assert(typeof ninja === 'object', 'The type of the instance is object.');

// Tests the type of ninja via instanceof operator.
// This provides more information - that it was constructed from Ninja
// assert(ninja instanceof Ninja, 'instanceof identifies the constructor');

// Tests the type of ninja via the constructor reference.
// This gives a reference to the constructor function.
// assert(ninja.constructor === Ninja, 'The ninja object was created by the Ninja function.');

/**
 * We can use the constructor property, that we now know accessible to all instances, as a
 * reference to the original function that created it. We can use this to verify the origin
 * of the instance (much as we can with the instanceof operator).
 *
 * Additionally, because this is just a refrerence to the original constructor, we can initiate
 * a new Ninja object using it, as shown in next listing
 */

/**
 * Listing 7.6 - Instantiating an new object using a reference to a constructor
 */

// Defines a constructor
// function Ninja() {}
// Creates an instance of Ninja constructor
// let ninja1 = new Ninja();

// Constructs a second Ninja from the first
// let ninja2 = new ninja1.constructor();

// Proves the new object's Ninja-ness
// assert(ninja2 instanceof Ninja, "It's a Ninja!");

// They aren't the same object, but two distinct instances
// assert(ninja1 !== ninja2, 'But not the same Ninja!');

/**
 * What's especially interesting is that we can do this without even having access to the original function;
 * we can use the reference completely begind the scenes, even if the original constructor is
 * no longer in scope.
 */

/**
 * NOTE: Although the constructor property of an object can be changed, doing so doesn't have any immediate
 * or obvious constructive purpose (though we might be able to think of some malicious ones). The property's
 * reason for being is to indicate from where the object was constructed. If the constructor property is
 * overwritten, the original value is lost.
 */
// -------------------------------------------------------------------------------------------------
