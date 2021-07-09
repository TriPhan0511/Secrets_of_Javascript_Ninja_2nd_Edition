// // 1. Function Declaration
// function sayHello() {
//   return `hello`;
// }
// assert(sayHello() === 'hello', 'Hello');
// -----------------------------------------------------------

// // 2. Function expression: Assign a function to a variable
// let sayAloha = function () {
//   return 'aloha';
// };
// assert(sayAloha() === 'aloha', 'Aloha');
// -----------------------------------------------------------

// // 3. Arrow function
// let goodMorning = () => 'Good morning!';
// assert(goodMorning() === 'Good morning!', 'Good morning!!!');

// let goodAfternoon = (whom) => {
//   return `Good afternoon, ${whom}!`;
// };
// assert(goodAfternoon('everyone') === 'Good afternoon, everyone!', 'Good afternoon, everyone!');
// -----------------------------------------------------------

// // 4. Rest parameter
// function multMax(first, ...rest) {
//   if (rest.length) {
//     // let max = rest.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue));

//     let max = rest.reduce((accumulator, currentValue) =>
//       accumulator > currentValue ? accumulator : currentValue
//     );

//     // let max = rest[0];
//     // for (let item of rest) {
//     //   if (item > max) {
//     //     max = item;
//     //   }
//     // }
//     return first * max;
//   }
// }

// assert(multMax(2, 3, 5, 4) === 10, '2*5=10');
// -----------------------------------------------------------

// // 5. Default parameter
// function sayHello(whom = 'everyone') {
//   return `Hello, ${whom}!`;
// }

// assert(sayHello() === 'Hello, everyone!', 'Hello, everyone!');
// assert(sayHello('Mr. Bill') === 'Hello, Mr. Bill!', 'Hello, Mr. Bill!');
// -----------------------------------------------------------

// 6. Assign a function to a property of an object
// // Defines an object
// let store = {
//   nextId: 1,
//   cache: {},
//   addFunction: function (fn) {
//     if (!fn.id) {
//       fn.id = this.nextId++;
//       this.cache[fn.id] = fn;
//       return true;
//     }
//   },
// };

// // Defines a function that will be added to the store object.
// function whatever() {}

// // Tests
// assert(store.addFunction(whatever), 'Function whatever is added!');
// assert(!store.addFunction(whatever), 'Cannot add function whatever once again!');
// -----------------------------------------------------------

// 7. Function can have  properties
// function isPrime(value) {
//   if (!isPrime.answer) {
//     isPrime.answer = {};
//   }

//   if (isPrime.answer[value] !== undefined) {
//     report('The answer was found in isPrime.answer! So we stop finding here.');
//     return isPrime.answer[value];
//   }

//   report('The answer WAS NOT FOUND in isPrime.answer, so we continue...');
//   let prime = true;
//   if (value < 2) {
//     prime = false;
//   } else {
//     for (let i = 2; i < value; i++) {
//       if (value % i === 0) {
//         prime = false;
//         break;
//       }
//     }
//   }

//   return (isPrime.answer[value] = prime);
// }

// assert(isPrime(2), '2 is a prime.');
// assert(isPrime(2), '2 is a prime.');
// assert(!isPrime(4), '4 is not a prime.');
// assert(!isPrime(4), '4 is not a prime.');
// -----------------------------------------------------------

// 8. Pass a function as an argument to another function
// // function reduce(array, fn, initialValue) {
// function reduce(array, fn, initialValue = array[0]) {
//   let accumulator = initialValue;
//   for (let item of array) {
//     accumulator = fn(accumulator, item);
//   }
//   return accumulator;
// }

// // Find the maximum value in array
// assert(reduce([1, 2, 5, 3, 4], (x, y) => (x > y ? x : y)) === 5, 'The maximum value is 5');
// assert(reduce([10, 2, 5, 3, 4], (x, y) => (x > y ? x : y)) === 10, 'The maximum value is 10');
// assert(reduce([1, 2, 5, 3, 15], (x, y) => (x > y ? x : y)) === 15, 'The maximum value is 15');
// assert(reduce([1, 2, 5, 5, 4], (x, y) => (x > y ? x : y)) === 5, 'The maximum value is 5');
// -----------------------------------------------------------

// 9. Function as a returned value from another function
// function whatever(value, action) {
//   return action(value);
// }

// assert(whatever(3, (e) => e * 2) === 6, '2*3=6');
// assert(whatever(3, (e) => e ** 2) === 9, 'Square of 3 is 9');
// assert(whatever(4, (e) => Math.pow(e, 2)) === 16, 'Square of 4 is 16.');
// -----------------------------------------------------------

// 10. The implicit arguments parameter of a function
// // Defines a function
// function whatever(first, second, third) {
//   assert(
//     arguments[0] === first && first === 1,
//     'We can access to the first argument through the implicit arguments parameter.'
//   );
//   assert(
//     arguments[1] === second && second === 2,
//     'We can access to the first argument through the implicit arguments parameter.'
//   );
//   assert(
//     arguments[2] === third && third === 3,
//     'We can access to the first argument through the implicit arguments parameter.'
//   );

//   assert(arguments[3] === 4, 'The fourth argument is 4.');
//   assert(arguments[4] === 5, 'The fifth argument is 5.');
// }

// // Invokes the function
// whatever(1, 2, 3, 4, 5);
// -----------------------------------------------------------

// 11. The implicit this parameter
// The this parameter points to the function context of the function

// 11.1 Function invocation as a function (invoke function in the global scope)
// The function context will be the global window object in non-strict mode
// and will be undefined in strict mode

// // Defines a function in non-strict mode
// function whatever() {
//   return this;
// }

// assert(
//   whatever() === window,
//   'The function context of function whatever is the global window object.'
// );

// // Define a function in strict mode
// function whatever_2() {
//   'use strict';
//   return this;
// }

// assert(whatever_2() === undefined, 'The function context of function whatever_2 is undefined.');
// -----------------------------------------------------------

// 11.2 Function invocation as a method of an object
// The function context will be the method's owning object.

// // Defines a function
// function whatever() {
//   return this;
// }

// // Defines an object and assign the whatever function to a property of this object,
// // so the whatever becomes a method of this object.
// const obj = {
//   doSomething: whatever,
// };

// // Invokes the method doDomething
// assert(obj.doSomething() === obj, 'The function context of doSomething method is the obj object.');
// -----------------------------------------------------------

// 11.3 Function invocation as a constructor
// The function will be the newly constructed object

// // Defines a constructor
// function Ninja() {
//   this.whatever = function () {
//     return this;
//   };
// }

// // Creates a Ninja instance
// let ninja1 = new Ninja();
// let ninja2 = new Ninja();

// assert(ninja1.whatever() === ninja1, 'The function context is the ninja1 object.');
// assert(ninja2.whatever() === ninja2, 'The function context is the ninja2 object.');
// -----------------------------------------------------------

// 11.4 Function invocation with two methods: apply and call
// Every function has two built-in methods: apply and call.
// We can use them to specify an object as function context of a function
// The difference between apply and call is: apply method uses an array of arguments,
// whereas, call method uses a list of individual argumnents

// Defines a function
// function whatever(v1, v2, v3) {
//   report(`The total is ${v1 + v2 + v3}.`);
//   return this;
// }

// // Declares two objects
// const obj_1 = {};
// const obj_2 = {};

// // Uses the apply method to specify obj_1 as the function context of whatever function
// assert(
//   whatever.apply(obj_1, [1, 2, 3]) === obj_1,
//   'obj_1 is the function context of whatever function '
// );

// // Uses the call method to specify obj_2 as the function context of whatever function
// assert(
//   whatever.call(obj_2, 1, 2, 3) === obj_2,
//   'Now, obj_2 is the function context of whatever function.'
// );
