/** 4.2.3 - Invocation as a constructor */

/**
 * There's nothing special about a function that's going to be used as a constructor.
 * Constructor functions are declared just like any other functions, and we can easily
 * use function delcarations and function expressions for constructing new objects.
 * The only exception is the arrow function, which as you'll see later in the chapter,
 * works a bit differently. But, in any case, the main difference is in how the function
 * is invoked.
 */

/**
 * To invoke a function as a constructor, we precede the function invocation with the
 * keyword new. For example, recall the whatsMyContext function from previous section:
 * 
      function whatsMyContext() {
        return this;
      }
 * 
 * If we want to invoke the whatsMyContext function as a constructor, we write this:
 * 
      new whatsMyContext();
 *
 * But even though we can invoke whatsMyContext as a constructor, that function isn't a
 * particularly useful constructor. Let's find out why by discussing what makes constructors
 * special.     
 */

/**
 * NOTE:
 * Remember in chapter 3, when we discussed ways of defining function? Among function declarations,
 * function expressions, arrow functions, and generator functions, we also mentioned
 * function constructors, which enables us to construct new functions from strings.
 * For example, new Function('a', 'b', 'return a + b') creates a new function with two parameters,
 * a and b, that return their sum.
 * Be careful not to confuse these function constructors with constructor functions! The difference
 * is subtle, yet significant. A function constructor enables us to create functions dynamically
 * created strings. On other hand, constructor functions, the topic of this section, are functions
 * that we use to create and initialize object instances.
 */
// ------------------------------------------------------------------------------------------------

/** THE SUPERPOWERS OF CONSTRUCTORS */

/**
 * Invoking a function as a constructor is a powerful feature of Javascript that we'll
 * explore in the following listing:
 */

/** Listing 4.7 - Using a constructor to set up common objects */

// A constructor that creates a skulk property on whatever object is the function context.
// The method once again returns the function context so that we can test it external.
// function Ninja() {
//   this.skulk = function () {
//     return this;
//   };
// }

// // Creates two objects by invoking the constructor with new.
// // The newly created objects are referenced by ninja1 and ninja2
// let ninja1 = new Ninja();
// let ninja2 = new Ninja();

// // Tests the skulk method of the constructed objects.
// // Each should return its own constructed object.
// assert(ninja1.skulk() === ninja1, 'The 1st ninja is skulking');
// assert(ninja2.skulk() === ninja2, 'The 2nd ninja is skulking');

/**
 * In this example, we create a function named Ninja that we'll use to construct, well, ninjas.
 * When invoked with the keyword new, an empty object instance is created and passed to the function
 * as its function context, the this parameter. The constructor creates a property named skulk on
 * this object, which is assigned a function, making that function a method of newly created object.
 */

/**
 * In general, when a constructor is invoked, a couple of special actions take place.
 * Calling a function with the keyword new triggers the following steps:
 *
 *   1. A new empty object is created.
 *   2. This object is passed to the constructor as the this parameter, and thus becomes the
 *      constructor's function context.
 *   3. The newly constructed object is returned as the new operator's value (with an exception
 *      that we'll get to in short order).
 */

/**
 * The last two points touch on why whatsMyContext in new whatsMyContext() makes
 * for a lousy constructor. The purpose of a constructor is to cause a new object
 * to be created, to set up it, nd to return it as the constructor value. Anything that
 * interferes with that intent isn't appropriate for constructor.
 */

/**
 * Let's consider a more appropriate constructor, Ninja, that sets up skulking ninjas,
 * as shown in listing 4.7:
 * 
     function Ninja() {
       this.skulk = function () {
         return this;
       };
     }
 * 
 * The skulk method performs the same operation as whatsMyContext in the previous sections,
 * returning the function context so that we can test it external.
 * 
 * With the constructor defined, we create two new Ninja objects by invoking the constructor twice.
 * Note that the returned values from the invocation are stored in variables that become references
 * to the newly created Ninjas:
 * 
     let ninja1 = new Ninja();
     let ninja2 = new Ninja();
 * 
 * Then we run tests that ensure that each invocationof the method operates on the expected object:
 * 
     assert(ninja1.skulk() === ninja1, 'The 1st ninja is skulking');
     assert(ninja2.skulk() === ninja2, 'The 2nd ninja is skulking');
 *      
 */

/**
 * That's it! Now you know how to create and initialize new objects with constructor functions.
 * Calling a function with the keyword new returns a newly created object.
 * But let's check whether that's always exactly true.
 */
// ------------------------------------------------------------------------------------------------

/** CONSTRUCTOR RETURNS VALUES */

/**
 * We mentioned earlier that constructors are intended to initialize newly created objects,
 * and that the newly constructed object is returned as a result of a constructor invocation
 * (via the new operator). But what happens when the constructor returns a value of its own?
 *
 * Let's explore that situation in the following listing
 */

/** Listing 4.8 - Constructors returning primitive values */

// // Defines a constructor function named Ninja
// function Ninja() {
//   this.skulk = function () {
//     return this;
//   };
//   return 1; // The constructor returns a specific primitive vale, the number 1
// }

// // The function is called as a function and its return value is 1, as expected.
// assert(Ninja() === 1, 'Return value honored when not called as a constructor.');

// // The function is called as a constructor via the new keyword.
// let ninja = new Ninja();

// // Tests verify that the return value of 1 is ignored,
// // and that a new, initialized object has been return from new.
// assert(typeof ninja === 'object', 'Object returned when call as a constructor.');
// assert(typeof ninja.skulk === 'function', 'ninja object has a skulk method.');

/**
 * If we run this listing, we'll see that all is fine and well. The fact that this Ninja function
 * returns a simple number 1 has no significant influence on how the code behaves. If we call the
 * Ninja function as a function, it returns 1 (just as we'd expect); and if we call it as a constructor,
 * with the keyword new, a new ninja object constructed and returned. So far, so good.
 *
 * But now let's try something different , a constructor returns another object, as shown in the following
 * listing:
 */

/** Listing 4.9 - Constructors explicitly returning object values */

// // Creates our own object with a known property
// let puppet = {
//   rules: false,
// };

// // Returns that object despite initializing the object passed as this
// function Emperor() {
//   this.rules = true;
//   return puppet;
// }

// // Invokes the function as a constructor
// let emperor = new Emperor();

// // Tests show that the object returned by the constructor
// // is assigned to the variable emperor (and not the object created by the new expression).
// assert(emperor === puppet, 'The emperor is merely a puppet!');
// assert(emperor.rules === false, 'The puppet does not how to rule!');

/**
 * Our tests indicate that the puppet object is returned as the value of constructor invocation,
 * and that the initialization that we performed on the function context in the constructor was
 * all for naught. The puppet has been exposed!
 *
 * Now that we've gone through some tests, let's summarize our findings:
 *
 *   _ If the constructor returns an object, that object is returned as the value of the
 *     whole new expression, and the newly constructed object passed as this to the constructor
 *     is discarded.
 *
 *   _ If, however, a nonobject is returned from constructor, the returned value is ignored,
 *     and the newly created object is returned.
 */

/**
 * Because of these peculiarities, functions intended for use as constructors are generally
 * coded differently from other functions. Let's explore that in greater detail.
 */
// ------------------------------------------------------------------------------------------------

/** CODING CONSIDERATIONS FOR CONSTRUCTORS */

/**
 * The intent of constructors is to initialize the new object that will be created by the
 * function invocation to initial conditions. And although such functions can be called as
 * "normal" functions, or even assigned to object properties in order to invoked as methods,
 * they're generally not useful as such. For example:
 * 
     function Ninja() {
       this.skulk = function () {
         return this;
       };
     }

     let whatever = Ninja();
 * 
 * We can call Ninja as a simple function, but the skulk property would be created on window 
 * in nonstrict mode - not a particularly useful operation. Things go even more awry in 
 * strict mode, as this would be undefined and our Javascript application would crash.
 * But this is a good thing; if we make mistake in nonstrict mode, it might escape our notice
 * (unless we had good tests), but there's no missing the mistake ins trict mode. This is 
 * good example of why strict mode was introduced.
 */

/**
 * Because constructors are generally coded and used in the manner that's different from
 * other functions, and aren't all that useful unless invoked as constructors,
 * a naming convention has arisen to distinguish from run-of-the-mil functions and methods.
 * If you've been paying attention, you may already noticed it.
 *
 * Functions and methods are genarally named starting with a verb that describes what they do
 * (skulk, creep, sneak, doSomethingWonderful, and so on) and start with a lowercase letter.
 * Constructors, on the other hand, are usually named as a noun that describes the object that's
 * being constructed and start with an uppercase character: Ninja, Samurai, Emperor, Ronin,
 * and so on.
 */

/**
 * It's easy to see how a constructor makes it more elegant to create multiple objects
 * that conform to the same pattern without having to repeat the same code over and over.
 * The common code is written just once, as the body of the constructor.
 * In chapter 7, you'll see more about using constructors and about the other object-oriented
 * mechanism that Javascript provides to make it even easier to set up object patterns.
 */

/**
 * But we're not finished with function invocations yet. There's still another way that
 * Javascript let us invoke functions that provides a great deal of control over the
 * invocation details.
 */
