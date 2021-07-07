/** 4.2.2 - Invocation as a method */

/**
 * When a function is assinged to a property of an object and the invocation occurs by referencing
 * the function using that property, then the function is invoked as a method of that object.
 * Here's an exmample:
 */

// let ninja = {};
// ninja.skulk = function () {};
// ninja.skulk();

/**
 * Okay; so what? The function is called a method in this case, but what makes that interesting
 * or useful? Well, if you come from an object-oriented background, you'll remember that the
 * object to which the method belongs is available within the body of the method as this.
 * The same thing happens here. When we invoke a function as a method of an object, the object
 * becomes the function context and is available within the function via the this parameter.
 * This is one of the primary means by which Javascript allows object-oriented code be written.
 * (Constructor are another, and we'll get into them in short order.)
 *
 * Let's consider some test code in the next listing to illustrate the differences and similarities
 * between invocation as a function and invocation as a method.
 */

/**
 * Listing 4.6 - The differences between functions and methods invocations
 */

// Returns the function context that will allow us to examine the context from outside
function whatsMyContext() {
  return this;
}

// Invoking as a function sets the context to the window object.
assert(whatsMyContext() === window, 'Function call on window.');

// getMyThis gets a reference to the whatsMyContext function
let getMyThis = whatsMyContext;

// Invokes the function using the getMyThis variable.
// Even though we use a variable, the function is still invoked as a function,
// and the function context is the window object.
assert(getMyThis() === window, 'Another function call on window.');

// A ninja1 object is created with a getMyThis property that references the whatsMyContext function.
let ninja1 = {
  getMyThis: whatsMyContext,
};

// Invoking the function through getMyThis calls it as a method of ninja1.
// The function context is now ninja1. That's object orientation!
assert(ninja1.getMyThis() === ninja1, 'Working with 1st ninja.');

// Another object, ninja2, also has a getMyThis property referencing whatsMyContext.
let ninja2 = {
  getMyThis: whatsMyContext,
};

// Invoking the function as a method of ninja2 shows that the function context is now ninja2.
assert(ninja2.getMyThis() === ninja2, 'Working with 2nd ninja.');

/**
 * This sets up a function named whatsMyContext that we'll use throughout the rest of the listing.
 * The only thing that this function does is to return its function context so that we can see,
 * from outside the function, what the function context for the invocation is. (Otherwise, we'd have
 * a hard time working.)
 * 
    function whatsMyContext() {
      return this;
    }
 */

/**
 * When we calll the function directly by name, this is a case of invoking as a function,
 * so we expect that the function context will be the global context (window), because
 * we're in non-strict mode. We assert that this is so:
 * 
      assert(whatsMyContext() === window, 'Function call on window.');
 */

/**
 * Then we create a reference to the function whatsMyContext in a varibale named getMyThis:
 * 
      let getMyThis = whatsMyContext;   
 *
 * This doesn't create a second instance of the function; it merely creates a reference to the
 * sam function (you know, first-class object and all)      
 * 
 * When we invoke the function via the variable - something we can do because the function invocation 
 * operator can be applied to any expression that evaluates to a function - we're once again invoking
 * the function as a function. As such, we again expect that the function context is window, and it is:
 * 
      assert(getMyThis() === window, 'Another function call on window.');
 */

/**
 * Now, we get a bit trickier and define an object in variable ninja1 with a property named getMyThis
 * that receives a reference to the whatsMyContext function. By doing so, we say that we've created
 * a method named getMyThis on the object. We don't say that whatsMyContext has become a method of ninja1;
 * it hasn't. You've already seen that whatsMyContext is its own independent function that can be invoked
 * in numerous ways:
 * 
    let ninja1 = {
      getMyThis: whatsMyContext,
    };
 * 
 * According to what we stated earlier, when we invoke the function via a method reference, we expect the
 * function context to be the method's object (in this case, ninja1) and we assert as much:
 * 
      assert(ninja1.getMyThis() === ninja1, 'Working with 1st ninja.');
 *    
 * NOTE: Invoking functions as methods is crucial to writing Javascript in an object-oriented manner.
 *        Doing so enables you to use this within any method to reference the 
 *        method's "owning" object - a funcdametal concept in object-oriented programming.
 */

/**
 * To drive that point home, we continue testing by creating yet another object, ninja2, also with
 * a property named getMyThis that references the whatsMyContext function.
 * Upon invoking this function through the ninja2, we correctly assert that its function context
 * is ninja2:
 * 
    let ninja2 = {
      getMyThis: whatsMyContext,
    };

    assert(ninja2.getMyThis() === ninja2, 'Working with 2nd ninja.');
 */

/**
 * Even though the same function - whatsMyContext - is used to througout the example, the function context
 * returned by this changes depending on how whatsMyContext is invoked.
 * For example, the exact same function is shared by both ninja1 and ninja2, yet when it's executed,
 * the function has access to, and can perform operations on, the object through which the method was invoked.
 * We don't need to create separate copies of a function to perform the exact same processing on different
 * objects. This is a tenet of object-oriented programming.
 */

/**
 * Though a powerful capability, the manner in which it's used in this example has limitations.
 * Foremost, when we create the two ninja objects, we're able to share the same function to used
 * as a method in each, but we have to use a bit of repeated code to set up the separate objects
 * and their methods.
 *
 * But that's nothing to despair over - Javascript provides mechanism to make creating objects
 * from a single pattern much easier than in this example. We'll explore those capabilities in depth
 * in chapter 7. But for now, let's consider a part of that mechanism that relates to function
 * invocations: the constructor.
 */
