/** 5.2.1 - Mimicking private variables */

/**
 * Many programing languages use private varaibles - properties of an object that
 * are hidden from outside parties. This is a useful feature, because we don't want to
 * overburden the users of our objects with unneccessary implementation details when
 * accessing those objects from other parts of the code. Unfortunately, Javascript doesn't
 * have native support for private variables. But by using a closure, we can achieve an
 * acceptable approximation, as demonstrated by the following code.
 */

/** Listing 5.3 - Using closures to approximate private variables */

// Defines the constructor for a Ninja
function Ninja() {
  // Declares a variable inside the constructor function.
  // Because the scope of the variable is limited to inside the constructor, it's a "private" variable.
  // We'll use it to count how many times the ninja has feinted.
  let feints = 0;

  // Creates an accessor method for the feints counter.
  // Because the variable isn't accessible to code outside the constructor,
  // this is a common way to give read-only access to the value.
  this.getFeints = function () {
    return feints;
  };

  // Declares the increment method for the value/
  // Because the value is private, no one can screw it up behind our backs;
  // they're limited to the access that we give them via methods
  this.feint = function () {
    feints++;
  };
}

// Now for testing - first we construct an instance of Ninja
let ninja1 = new Ninja();

// Calls the feint method, which increments the count of the number of times that our ninja has feinted
ninja1.feint();

// Verifies that we can't get at the variable directly.
assert(ninja1.feints === undefined, 'And the private data is inaccessible to us.');
// We were able to change the "private" variable, even though we had no direct access to it.
assert(ninja1.getFeints() === 1, "We're able to access the internal feint count.");

// When we create a new ninja2 object with the Ninja constructor, the ninja2 object gets its own feints variable.
let ninja2 = new Ninja();
assert(ninja2.getFeints() === 0, 'The second ninja object get its own feints variable.');

/**
 * Here we create a function, Ninja, to serve as a constructor. Recal that when using the new keyword
 * on a function, a new object instance is created, and the function is called with that new object
 * as its context, to server as a constructor to that object. So this within the function refers to
 * a newly instantiated object.
 *
 * Within the constructor, we define a varariable to hold state, feints. The Javascript scoping rules
 * for this variable limit its accessibility to within the constructor. To give access to the value of
 * the variable from code that's outside the scope, we define an accessor method: getFeints, which can
 * be used to read the private varible. (Accessor methods are frequently called getters.)
 * 
      function Ninja() {
        let feints = 0;
        this.getFeints = function () {
          return feints;
        };
        this.feint = function () {
          feints++;
        };
      }
 * 
 * An implementation method, feint, is then created to give us control over the value of the variable. 
 * In a real-world application, this might be a business method, but in this example, it merely increments
 * the value of feints.
 * 
 * After the constructor has done its duty, we can call the feint method on the newly created ninja1 object:
 * 
      let ninja1 = new Ninja();
      ninja1.feint();
 * 
 * Our tests show that we can use the accessor method to obtain the value of the private variable but that
 * we can't access it directly. This prevents us from being able to make uncontrolled changes to the value
 * of the variable, just as if it were a true private variable
 */

/**
 * Using closures allows the state of the ninja to be maintained within a method, without letting it be
 * directly accessed by a user of a method -  beacause the variable is available to the inners methods
 * via their closures, but not to code that lies outside the constructor.
 */
