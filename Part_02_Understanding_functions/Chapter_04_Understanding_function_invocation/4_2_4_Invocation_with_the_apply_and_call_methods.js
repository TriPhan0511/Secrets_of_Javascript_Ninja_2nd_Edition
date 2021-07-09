/** 4.2.4 - Invocation with the apply and call methods */

/**
 * So far, you've seen that one of the major differences between the types of function invocation
 * is what object ends up as the function context referenced by the implicit this parameter that's
 * passed to the executing function. For methods, it's the method's owning object;
 * for top-level functions, it's either window or undefined (depending on the current strictness);
 * for constructors, it's a newly created object instance.
 *
 * But what if we want to make the function context whatever we want?
 * What if we want to set it explicitly? What if...well, why would we want to do such a thing?
 *
 * To get a glimpse of why we'd care about this ability, we'll look at a practical example that
 * illustrate a surprisingly common bug related to event handling. For now, consider that when
 * an event handler is called, the function context is set to the object to which the event
 * was bound. Take a look at the following listing.
 */

/** Listing 4.10 - Binding a specific context to a function */

/*
    <button id="test">Click me</button>

    <script>
      // A constructor function that creates objects that retain state regarding our button.
      // With it, we'll track whether the button has been click
      function Button() {
        this.clicked = false;
        // Declares the method that we'll use as the click handler.
        // Because it's a method of a object, we use this within the function to get a reference to the object
        this.click = function () {
          this.clicked = true;
          // Within the method, we test that the button state has been correctly change after a click.
          assert(button.clicked, 'The button has been clicked');
        };
      }

      // Creates an instance that will track whether the button was clicked
      let button = new Button();
      // Establishes the click handler on the button
      let elem = document.getElementById('test');
      elem.addEventListener('click', button.click);
    </script>
*/

/**
 * In this example, we have a button, <button id="test">Click me</button>, and we 
 * want to know whether it has ever been clicked. To retain that state information, we use
 * a constructor function to create a backing object named button, in which we'll store 
 * the clicked state:
 * 
      function Button() {
        this.clicked = false;
        this.click = function () {
          this.clicked = true;
          assert(button.clicked, 'The button has been clicked');
        };
      }

      let button = new Button();
 * 
 * In that object, we also define a click method that will serve as an event handler that 
 * fires when the button is clicked. The method sets the clicked property to true and then 
 * tests that state was properly recorded in the backing object (we've intentionally used 
 * the button identifier instead of the this keyword - after all, they should refer to the
 * same thing, or should they?). Finally, we establish the button.click method as a click
 * handler for the button:
 * 
      let elem = document.getElementById('test');
      elem.addEventListener('click', button.click);
 * 
 * When we load the example into a browser and click the button, we see something is amiss;
 * the stricken text indicates that the test failed. The code in listing 4.10 fails because 
 * the context of the click function isn't referring to the button object as we intended.
 * 
 * Recalling the lessons of earlier in the chapter, if we had called the function via 
 * button.click(), the context would have been the button, because the function would be 
 * invoked as a method on the button object. But in this example, the event-handling system 
 * of the browser defines the context of the invocation to be the target element of the event,
 * which causes the context to be the <button> element (a HTML element), not the button object.
 * So we set our click state on the wrong object!
 * 
 * This is a surprisingly common problem, and later in the chapter, you'll see techniques for
 * completely evading it. For now, let's explore how to tackle it by examining how to explicitly
 * setthe fucntion context by using the apply and call nethods.
 */
// -----------------------------------------------------------------------------------------------------

/** USING THE APPLY AND CALL METHODS */

/**
 * Javascript provides a means for us to invoke a function and to explicitly specify any object
 * we want as the function context. We do this through the use of one of two methods that exist
 * for every function: apply and call.
 *
 * Yes, we said methods of functions. As first-class objects (created, by the way, by the
 * built-in Function constructor), functions can have properties just like any other object type,
 * including methods.
 *
 * To invoke a function by using its APPLY method, we pass two parameters to apply:
 * the object to be used as the function context, and an array of values to be used
 * as the invocation arguments.
 * The CALL method is used in a similar manner, except that the arguments are passed
 * directly in the argument list rather than as a array.
 *
 * The following listing shows both of these methods in action
 */

/** Listing 4.11 - Using the apply and call methods to supply the function context */

// // The function "juggles" the arguments and
// // puts the result onto whatever object is the function context
// function juggle() {
//   let result = 0;
//   for (let i = 0; i < arguments.length; i++) {
//     result += arguments[i];
//   }

//   this.result = result;
// }

// // These objects are initially empty and will serve as our test subjects.
// let ninja1 = {};
// let ninja2 = {};

// // Uses the apply method, passing ninja1 and an array of arguments
// juggle.apply(ninja1, [1, 2, 3, 4]);
// // Uses the call method, passing ninja2 and a list of arguments
// juggle.call(ninja2, 5, 6, 7, 8);

// // The tests show how the juggle result is placed on the objects passed to the methods.
// assert(ninja1.result === 10, 'juggled via apply');
// assert(ninja2.result === 26, 'jugggled via call');

/**
 * These two methods, call and apply, can come in handy whenever it's expedient to usurp
 * what would normally be the function context with an object of our own choosing - something
 * that can be particularly useful when invoking callback functions.
 */
// -----------------------------------------------------------------------------------------------------

/** FORCING THE FUNCTION CONTEXT IN CALLBACKS */

/**
 * We'll use a simple function to perform an operation on every entry of an array.
 */

/**
 * In imperative programming, it's common to pass the array to a method and use a for loop
 * to iterate over every entry, performing the operation on each entry:
 * 
    funtion (collection){
      for (let i=0; i < collection.length; i++){
        // do something to collection[n]
      }
    }
 * 
 */

/**
 * In constrast, the functional approach is to create a function that operates 
 * on a single element and passes each entry to that function:
 * 
    function(item){
      // do something to item
    }
 * 
 */

/**
 * To facilitate a more functional style, all array objects have access to a forEach function
 * that invokes a callback on each element within an array. This is often more succinct, and
 * this style is preferred over the traditional for statement by those familiar with
 * functional programming. Such an iteration function could pass the current element to the
 * callback as a parameter, but most make the current element the function context of the
 * callback.
 *
 * Even though all modern Javascript engines now support a forEach method on arrays,
 * we'll build our own (simplified) version of such a function in next listing.
 */

/** Listing 4.12 - Building a forEach function to demonstrate setting a function context */

// function forEach(list, callback) {
//   for (let i = 0; i < list.length; i++) {
//     callback.call(list[i], i); // The callback is invoked such that the current iteration item is the function context.
//   }
// }

// let weapons = [{ type: 'shuriken' }, { type: 'katana' }, { type: 'nunchucks' }];

// // Calls the iteration function and ensures that the function context is correct
// // for each invocation of the callback
// forEach(weapons, function (index) {
//   assert(this === weapons[index], `Got the expected value of ${weapons[index].type}`);
// });
// -----------------------------------------------------------------------------------------------------

/**
 * Given that apply and call do pretty much the same thing, here's something you might be
 * asking yourself at this point: How do you decide which to use? The high-level answer is
 * the same as for many such questions: We use whichever one improves code clarity. A more
 * pratical answer is to use the one best matches the argument we have handy. If we have a
 * bunch of unrelated values in variables or specified as literals, call lets us list them
 * directly in its argument list. But if we have the argument values in an array, ir if it's
 * convenient to collect them as such, apply could be the better choice.
 */
