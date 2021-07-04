/**
 * 3.1.2 - Callback functions
 */

/**
 * Whenever we set up a function to be called at a later time, whether by the browser in the evnt-handling phase or
 * by other code, we're setting up a CALLBACK. The term stems from the fact that we're establishing a function that
 * other code will later "call back" at an appropriate point of execution.
 *
 * Callbacks are an essential part of using Javascript effectively.
 *
 * In this section, we're about to look at how to use callbacks to handle events or to easily sort collections -
 * typical real-world examples of how callback are used. But it's a tad complex, so before diving in, let's strip
 * the callback concept completely naked and examineit in its simplest form. We'll start with an illuminating
 * example of a completely useless function that accepts a reference to another function as a prameter and calls
 * that function as a callback:
 */

// function useless(ninjaCallback) {
//   ninjaCallback();
// }

/**
 * A useless as this function is, it demonstrates the ability to pass a function as an argumnet to
 * another function, and to subsequently invoke that function through the passed parameter.
 *
 * We can test this useless function with the code in the following listing:
 */

/** Listing 3.1 - A simple callback example */

// let text = 'Domo arigato!';
// report('Before defining functions');

// // Defines a function that takes a callback funnction and immediately invokes it
// function useless(ninjaCallback) {
//   report('In useless function');
//   return ninjaCallback();
// }

// // Defines a simple function that returns a global variable
// function getText() {
//   report('In getText function');
//   return text;
// }

// report('Before making all calls');

// // Call our useless function with the getText function as a callback
// assert(useless(getText) === text, `The useless function works! ${text}`);

// report('After the calls have been made.');

/**
 * This is easy, because Javascript's functional nature lets us deal with functions as first-class objects.
 * We can even take the whole thing a step furtherm by rewriting our code in the following manner:
 */

// let text = 'Domo arigato!';

// function useless(ninjaCallback) {
//   return ninjaCallback();
// }

// assert(
//   useless(function () {
//     return text;
//   }) === text,
//   `The useless function works!!! ${text}`
// );

/**
 * One of the most important features of Javascript is the ability to create functions in the code anywhere an
 * expression can appear. In addition to making the code more compact and easy to understand (by putting
 * function definition near where they're used), this feature can also eliminate the need to pollute the
 * global namespace with unnecessary names when a function isn't going to be referenced from multiple places
 * within the code.
 */

/**
 * In the preceding example of callback, we call our own callback. But callbacks can also be called by
 * the browser. Think back to chapter 2, which has an example with the following snippet:
 * 
    document.body.addEventListener('mousemove', function () {
      addMessage(document.getElementById('second'), 'Event: mousemove');
    });
 * 
 * That's also a callback function, one that's defined as an event handler to the mousemove event, and that will
 * be called by the browser when that event occurs.   
 */

/** Now let's consider a use of callbacks that will greatly simplify how we sort collections */

/** SORTING WITH A COMPARATOR */

/**
 * Almost as soon as we have a collection of data, odds are we're going to need to sort it.
 * Let's say we have an array of numbers in a random order: 0, 3, 2, 5, 7, 4, 8, 1.
 * That order may be just fine, but chances are that, sooner or later, we'll want to rearrange it.
 *
 * Usually, implementing sorting algorithm isn't the most trivial of programming tasks; we have to select
 * the best algorithm for the job at hand, implement it, adapt it to our current need (so that the items
 * are sorted in a particular order), and be careful not introduce bugs. Out of these tasks, the only one
 * that's application specific is the sorting order. Luckily, all Javascript arrays have access to
 * the sort method that require us only to define a comparison algorithm that tells the sort algorith how
 * the values should be ordered.
 *
 * This is where callbacks jump in! Instead of letting the sort algorithm decide what values go before other
 * values, we'll provide a function that performs the comparison.
 * We'll give the sort algorithm access to this function as a callback, and the algorithm will call the callback
 * whenever it needs to make a comparison. The callback is expected to return a positive number if the order of
 * the passed values should be reversed, a negative number if not, and zero if the values are equal; subtracting
 * compared values produces the desired return value to sort the array:
 */

// let values = [0, 3, 2, 5, 7, 4, 8, 1];

// values.sort(function (value1, value2) {
//   return value1 - value2;
// });

// console.log(values);
// // [0, 1, 2, 3, 4, 5, 7, 8]

/**
 * There's no need to think about the low-level details of a sorting algorithm (or even which sorting algorithm
 * to choose). We provide a callback that the Javascript engine will be call everytime it needs to compare two items.
 */

/**
 * The functional approach allow us to create a function as a standalone entity, just as we can any other object
 * type, and to pass it as an argument to a method, just like any other object type, which can accept it as a
 * parameter, just like any other object type. It's that first-class status coming into play.
 */
