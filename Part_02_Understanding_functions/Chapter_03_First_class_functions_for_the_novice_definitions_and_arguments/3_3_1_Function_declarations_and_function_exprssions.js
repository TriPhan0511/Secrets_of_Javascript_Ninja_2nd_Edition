/** 3.3.1 - Function declarations and function expressions */

/**
 * The two most common ways of defining functions in Javascript are by using function declarations and
 * function expressions. These two techniques are so similar that often we don't even make distinction
 * between them, but as you'll see in the follwing chapters, subtle differences exist.
 */

/** FUNCTION DECLARTIONS */

/**
 * Every function declaration starts with a mandatory function keyword, followed by a mandatory function name
 * and a list of optional comma-separated parameter names enclosed within madatory parentheses. The function body,
 * which is a potentially empty list of statements, must be enclosed within an opening and a closing brace.
 * 
      function myFunctionName(myFirstArg, mySecondArg) {
        // myStatement1;
        // myStatement;
      }
 * 
 * In addition to this form, which every function declaration must satisfy, there's one more condition:
 * A function declaration must placed on its own, as a separate Javascript statement (but can be contained within
 * an other function or a block of code; you'll see exactly what we mean by that in the next section).
 */

/** Listing 3.4 - Examples of function declarations */

// // Defines function samurai in the global code
// function samurai() {
//   return 'samurai here';
// }
// ----------------------------------------------------------

// // Example: A function defined within another function
// // Defines function ninja in the global code
// function ninja() {
//   // Defines function hiddenNinja within the ninja function
//   function hiddenNinja() {
//     return 'Ninja here';
//   }
//   return hiddenNinja();
// }

/**
 * NOTE: Having functions contained in other functions might raise some tricky questions regarding scope and
 * identifier resolution, but save them for now, because we'll revisit this case in detail in chapter 5.
 */

/** FUNCTION EXPRESSIONS */

/**
 * As we've already mentioned multiple times, functions in Javascript are first-class objects, which,
 * among other things, means that they can be created via literals, assigend to varibles and properties,
 * and used as arguments and return values to and from other functions. Beacause functions are such fundamental
 * construct, Javascript enable us to treat them as any other expression. So, just as we can use number literals,
 * for example:
 *
 *    let a = 3;
 *    myFunction(4);
 *
 * so too we use function literals, in the same locations
 *
 *    let a = function() {};
 *    myFunction(function() {})
 *
 * Such functions that are always a part of another statement (for example, as the right side of
 * an assigment expression, or as an argument to another function) are called function expressions.
 * Function expressions are greate because they allow us to define functions exactly where we need them,
 * in the process making our code easier to understand.
 *
 * The following listing shows the difference between function declarations and function expressions.
 */

/** Listing 3.5 - Function declarations and function expressions */

// Standalone function declaration
function myFunctionDeclaration() {
  // Inner function declaration
  function innerFunction() {}
}

// Function expression as a part of a variable declaration assigment
let myFunc = function () {};

// Function expression as an argument of a function call
myFunc(function () {
  return function () {}; // Function expression as a function return value
});

// Named function expression as a part of a function call that will be immediately invoked
(function namedFunctionExpression() {})();

// Function expressions that will be immediately invoked, as arguments to unary operators
+(function () {})();
-(function () {})();
!(function () {})();
~(function () {})();

/**
 * This example code begins with a standard function declaration that contains another inner function declaration:
 * 
    function myFunctionDeclaration() {
        function innerFunction() {}
      }

 * Here you can see how function declarations are separate statements of Javascript code, but can be contained 
 * within the body of other functions.      
 */

/**
 * In contrast are function expressions, which are always a part of another statement.
 * They're placed o the expression level, as the right side of a variable declaration (or an assigment):
 *
 *    let myFunc = function() {};
 *
 * Or as an argument to another function call, or as a function return value:
 *
 *    myFunc(function() {
 *      return function() {};
 *    });
 */

/**
 * Besides the position in code where they're placed, there's one more difference between function declarations
 * and function expressions: For function declarations, the function name is mandatory,
 * whereas for function expressions it's completely optional.
 *
 * Function declarations must have a name defined because they stand on their own.
 * Because one of the basic requirements for a fucntion is that it has to be invokable, we have to have a way to
 * reference it, and the only way to do this is through its name.
 *
 * Function expressions, on the other hand, are parts of other Javascript expressions, so we have alternate ways
 * to invoke them. For example, if a function expression is assigned to a variable, we can use that variable to
 * invoke the function:
 * 
      let doNothing = function () {};
      doNothing();
 * 
 * Or, if it's an argument to another function, we can invoke it within that function through 
 * the matching parameter name: 
 * 
      function doSomething(action) {
        action();
      }
 */

/** IMMIDIATE FUNCTIONS */

/**
 * Function expressions can even be placed in positions where they look a bit weird at first, such as a location
 * where we'd normally expect a function identifier
 */

// Example

// // Standard function call:
// myFunctionName(3); // An expression that evaluates to a function, in this case an identifier

// // Immidiately call to function expression:
// (function () {})(3); // An expression that evaluates to a function, in this case is a function expression

/**
 * When we want to make a function call, we use an expression that evaluates to a function, followed by a pair of
 * function call parentheses, which might contain arguments.
 * In the most basic function call, we put an identifier that evalutes to a function, as on the left side of the
 * above figure. But the expression to the left of the calling parenthesis doesn't have to be a simple identifier;
 * it can be any expression that evaluates to a function. For example, a simple way to specify an expression that
 * evaluates to a function is to use a function expression. So, we first creates a function, and then we immediately
 * invoke the newly created function. This, by the way, is called an immediately invoked function expression (IIFE),
 * or immediate function for short, and is an important concept in Javascript development because it allow us to
 * mimic modules in Javascript. We'll focus on this application of IIFE in chapter 11.
 */

/**
 * PARENTHESES AROUND FUNCTION EXPRESSIONS
 *
 * One more thing might be nagging you about the way we immediately called function expression:
 * the parentheses around the function expression itself. Why do we even need those?
 * The reason is purely syntactical.
 * The Javascript parser has to be able to easily differentiate between function declarations and
 * function expressions. If we leave out the parentheses around the function expression, and put our immediate
 * call as a separate statement: function () {} (3), the Javascript parser will start processing it,
 * and will conclude. because it's a separate statement starting with the keyword "function", that it's
 * dealing with a function declaration. Because every function declaration has to have a name (and here we
 * didn't specify one), an error will be thrown.
 * To avoid this, we place the function expresison within parentheses, signaling to the Javascript parser that
 * it's dealing with an expression, and not a statement.
 *
 * There's also an alternate, even simpler way (yet, strangely, a little less often used) of achieving the same
 * goal: (function () {}(3)). By wrapping the immediate function definition and call with parentheses,
 * you can also notify the Javascript parser that it's dealing with an expression.
 */

/**
 * The last four expressions in listing 3.5 are variations of the same theme of immediately invoked function
 * expressions often found in various Javascript libraries:
 *
    +(function () {})();
    -(function () {})();
    !(function () {})();
    ~(function () {})();
 * 
 * This time, instead using parentheses around the function expressions to differentiate them from 
 * function declarations, we can use unary operators: +, -, !, and ~.
 * We do this to signal to the Javascript engine that it's dealing with expression and not statements.
 * Notice how the results of applying these unary operators aren't stored anywhere; from a computational
 * perspective, they don't really matter; only the calls to our IIFEs matter.
 */
