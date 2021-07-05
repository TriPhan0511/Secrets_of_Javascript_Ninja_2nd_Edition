/** 3.3.2 - Arrow functions */

/**
 * NOTE: Arrow functions are an ES6 addition to the Javascript standard
 */

/**
 * Because in our Javascript we use a lot of functions, it makes sense to add some syntactic sugar that enable us
 * to create functions in a shorter, more succinct way, thus making our lives as developers more pleasant.
 *
 * In a lot of ways, arrow functions are a simplification of function expressions. Let's revisit our sorting example
 * from the first section of this chapter:
 */

// let values = [0, 3, 2, 5, 7, 4, 8, 11];
// values.sort(function (value1, value2) {
//   return value1 - value2;
// });

// console.log(values);
// // -> [0, 2, 3, 4, 5, 7, 8, 11]

/**
 * This example uses a callback function expression sent to the sort method of the array object;
 * this callback will be invoked by Javascript engine to sort the values of the array in asceding order.
 *
 * Now let's see how to do the same thing with arrow functions:
 */

// let values = [0, 3, 2, 5, 7, 4, 8, 11];
// values.sort((value1, value2) => value1 - value2);

// console.log(values);
// // ->  [0, 2, 3, 4, 5, 7, 8, 11]

/** See how much more succinct this is? */

/**
 * There's no clutter caused by the function keyword, the braces, or the return statement.
 * In a much simpler way than a function expresison can, the arrow function states: here's a function that takes
 * two arguments and returns their difference.
 * Notice the introduction of a new operator, =>, the so-called, fat-arrow operator (an equals sign immediately
 * followed by a greater-than sign), that's at the core of defining an arrow function.
 */

/**
 * Now let's deconstruct the syntax of an arrow function, starting with the sipmplest possible way:
 *
 *    param => expression
 *
 * This arrow function takes a parameter and returns the value of an expression.
 * We can use this syntax as shown in the following listing:
 */

/** Listing 3.6 - Comparing an arrow function and a function expression */

// let greet = (name) => `Greetings ${name}`; // Defines an arrow function
// assert(greet('Oishi') === 'Greetings Oishi', 'Oishi is properly greeted');

// // Define a function expression
// let anotherGreet = function (name) {
//   return `Greetings ${name}`;
// };
// assert(anotherGreet('Oishi') === 'Greetings Oishi', 'Again, Oishi is properly greeted');

/**
 * The arrow function definition starts with an optional comma-separated list of parameter names.
 * If there are no parameters, or more than one parameter, the list must be enclosed within parentheses.
 * But if we have only a single parameter, the parentheses are optional. The list of parameters is followed
 * by a mandatory fat-arrow operator, which tells us and the Javascript engine that we're dealing with an
 * arrow function.
 *
 * After the fat-arrow operator, we have two options. If it's a simple function, we put an expresion there
 * (a mathematical operation, another function invocation, whatever), and the result of the invocation will
 * be the value of that expression. For instance, our first arrow function example has the following arrow
 * function:
 * 
      let greet = (name) => `Greetings ${name}`;
 * 
 * The return value of the function is a concatenation of the string "Greetings" with the value 
 * of the name parameter.
 * 
 * In other case, when our functions aren't that simple and require more code, we can include a block of code
 * after the arrow operator. For example:
 */

let greet = (name) => {
  let helloString = 'Greetings';
  return `${helloString} ${name}`;
};

/**
 * In this case, the return value of the arrow function behaves as in a standard function.
 * If there's no return statement, the result of the function invocation will be undefined,
 * a dn if there is, the result will be the value of the return expression.
 */
