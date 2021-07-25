/** 7.3.3 - Object typing via constructors */

/**
 * Although it's great to know how Javascript uses the prototype to find the correct
 * property references, it's also handy to know which function constructed an object
 * instance. As you seen earlier, the constructor of an object is available via the
 * constructor property of the constructor function prototype.
 *
 * By using the constructor property, we can access the function that was used to
 * create the object. This information can bue used as a form of type checking, as
 * shown in the next listing.
 */

/** Listing 7.5 - Examining the type of an instance and its constructor */

// function Ninja() {}
// const ninja = new Ninja();

// // Tests the type of ninja via typeof.
// // This tell us it's an object, but not much else.
// assert(typeof ninja === 'object', 'The type of instance is object.');

// // Tests the type of ninja via instanceof.
// // This provides more information - that it was constructed from Ninja.
// assert(ninja instanceof Ninja, 'instanceof identifies the constructor.');

// // Tests the type of ninja via the constructor reference.
// // This gives a reference to the constructor function.
// assert(ninja.constructor === Ninja, 'The ninja object was created by the Ninja function.');

/**
 * We can use the constructor property, that we now know is accessible to all instances,
 * as a reference to the original function that created it. We can use this to verify
 * the origin of the instance (much as we can with the instanceof operator).
 */

/**
 * Additionally, because this is just a reference to the original constructor, we can instantiate
 * a new Ninja object using it, as shown in the next listing.
 */

/** Listing */

function Ninja() {}

const ninja1 = new Ninja();

// Constructs a second Ninja from the first
const ninja2 = new ninja1.constructor();

// Proves the new object's Ninja-ness
assert(ninja2 instanceof Ninja, "It's a ninja.");
// They aren't the same object, but two distinct instances.
assert(ninja1 !== ninja2, 'But not the same Ninja!');

/**
 * What's especially interesting is that we can do this without even accessing to the original
 * function; we can use the reference completely behind the scenes, even if the original constructor
 * is no longer in scope.
 */

/**
 * NOTE:
 * Although the constructor property of an object can be changed, doing so doesn't have any
 * immediate or obvious constructive purpose. The property's reason for being is to indicate
 * where the object was constructed. If the constructor property is overwritten, the original
 * value is lost.
 */
