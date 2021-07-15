/** CLOSURE */

/**
 * A closure is the combination of a function bundled together (enclosed) with references
 * to its surrounding state (the lexical environment). In other words, a closure give you
 * access to an outer function's scope from an inner function. In Javascript, closures are
 * created every time a function is created, at function creation time.
 */
// ----------------------------------------------------------------------------------------

/** Lexical scoping */

// // Defines a init function
// function init() {
//   let name = 'Mozilla';
//   function displayName() {
//     console.log(name);
//   }

//   displayName();
// }

// // Calls the init function
// init();
// ----------------------------------------------------------------------------------------

/** Closure */

// function makeFunc() {
//   let name = 'Mozilla';
//   function displayName() {
//     console.log(name);
//   }

//   return displayName;
// }

// let myFunc = makeFunc();
// myFunc();

/**
 * Running this code has exactly the same effects as the previous example of the init function above.
 * What's different (and interesting) is that the displayName inner function is returned from the
 * outer function before being executed.
 *
 * At the first glance, it might seem unintuitive that this code still works. In some programming languages,
 * the local variables within a function exist for just the duration of that function's execution.
 * Once makeFunc finishes executing, you mighe expect the name variable would no longer be accessible.
 * However, because the code still works as expected, this is obviously not the case in Javascript.
 *
 * The reason is that functions in Javascript form closures. A closure is a combination of a function and
 * the lexcial environment within which the function was declared. This environment consists of any local
 * variables that were in-scope at the time the closure was created. In this case, myFunc is a reference to
 * the instance of the function displayName that is created when makeFunc is run. The instance if displayName
 * maintains a reference to its lexical environment, within which the variable name exists. For this reason,
 * when myFunc is invoked, the variable name remains available for use, and "Mozilla" is passes to console.log.
 */

/** Here's a slightly more interesting example - a makeAdder function: */

// function makeAdder(x) {
//   return function (y) {
//     return x + y;
//   };
// }

// let add5 = makeAdder(5);
// let add10 = makeAdder(10);

// console.log(add5(100));
// // -> 105

// console.log(add10(100));
// // -> 110

/**
 * In this example, we have defined a function makeAdder(x), that takes a single argument x, and
 * returns a new function. The function its returns take a single argument y, and returns the sum
 * of x and y.
 *
 * In essence, makeAdder is a function factory. It creates functions that can add a specific value
 * to their argument. In the above example, the function factory creates two new functions - one that
 * adds five to its argument, and one that adds 10.
 *
 * add5 and add10 are both closures. They share the same function body definition, but store different
 * lexical environment. In add5's lexical environment, x is 5, while in the lexical environment for
 * add10, x is 10.
 */
// ----------------------------------------------------------------------------------------

/** Practical closures */

/**
 * Closure are useful because they let you associate data (the lexical environment) with a function
 * that operates on that data. This has obvious parallels to object-oriented programming, where objects
 * allow you associate data (the object's properties) with one or more methods.
 *
 * Consequently, you can use a closure anywhere that you might normally use an object with only a single
 * method.
 *
 * Situations where you want to do this are particularly common on the web. Much of the code written in
 * front-end Javascript is event-based. You define some behavior, and then attach it to an event that is
 * triggered by the user (such as a click or a keypress). The code is attached as a callback (a single
 * function that is executed in response to the event).
 */

/** For instance, suppose we want to add buttons to a page to adjust the text size.
 * One way of doing this is to specify the font-size of the body element (in pixels),
 * and then set the size of the other elements on the page (such as headers) using the
 * relative em unit:
 */

/**
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
          }

          h1 {
            font-size: 1.5em;
          }

          h2 {
            font-size: 1.2em;
          }
        </style>
 */

/**
 * Such interactive text size buttons can change the font-size property of the body element,
 * and the adjustment are picked up other elements on the page thanks to the relative units.
 *
 * Here's the Javascript code:
 */

/**
          // Defines a makeSizer function
          function makeSizer(size) {
            return function () {
              document.body.style.fontSize = `${size}px`;
            };
          }

          // Defines some callback functions
          let size12 = makeSizer(12);
          let size14 = makeSizer(14);
          let size16 = makeSizer(16);

          // Add click event handler to buttons
          document.getElementById('size-12').addEventListener('click', makeSizer(12));
          document.getElementById('size-14').addEventListener('click', makeSizer(14));
          document.getElementById('size-16').addEventListener('click', makeSizer(16)); 
 */

/**
 * HTML code:
 */

/**
        <a href="#" id="size-12">12</a>
        <a href="#" id="size-14">14</a>
        <a href="#" id="size-16">16</a>

        <h1>This is h1 heading</h1>
        <h2>This is h2 heading</h2>
        <p>And this is a paragraph</p> 
 */
// ----------------------------------------------------------------------------------------

/** Emulating private methods with closures */
// ----------------------------------------------------------------------------------------

/** Closure Scope Chain */

/**
 * Every closure has three scopes:
 *
 *  _ Local scope (Own scope)
 *  _ Outer function scope
 *  _ Global scope
 *
 * A common mistake is not realizing that in the case where the outer function is itself
 * a nested function, access to the outer function's scope includes the enclosing scope
 * of the outer function - effectively creating a chain of function scopes. To demonstrate,
 * consider the following code.
 */

// // Declares a global variable
// let f = 50;

// // Defines a sum function
// function sum(a) {
//   return function (b) {
//     return function (c) {
//       return function (d) {
//         return function (e) {
//           return a + b + c + d + e + f;
//         };
//       };
//     };
//   };
// }

// // Calls the sum function
// console.log(sum(1)(2)(3)(4)(5));
// // -> 65
// ----------------------------------------

// // Declares a global variable
// let f = 100;
// // Defines a sum function without anonymous functions
// function sum(a) {
//   function sum2(b) {
//     function sum3(c) {
//       function sum4(d) {
//         function sum5(e) {
//           return a + b + c + d + e + f;
//         }
//         return sum5;
//       }
//       return sum4;
//     }
//     return sum3;
//   }
//   return sum2;
// }

// let sum2 = sum(10);
// let sum3 = sum2(20);
// let sum4 = sum3(30);
// let sum5 = sum4(40);
// let result = sum5(50);
// console.log(result);
// // -> 250

/**
 * In the example above, there's a series of nested functions, all of which have access tot the
 * outer function's scope. In this context, we can say that closures have access to all outer
 * function scopes.
 */
