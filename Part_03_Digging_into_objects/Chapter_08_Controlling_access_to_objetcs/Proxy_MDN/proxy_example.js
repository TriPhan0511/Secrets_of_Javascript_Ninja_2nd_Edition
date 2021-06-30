/**
 * PROXY
 *
 * The Proxy object enables you create a proxy for another object, which can intercept and
 * redefine fundamental operations for that object.
 */
// ---------------------------------------------------------------------------------------------

/**
 * Description
 *
 * A proxy is created with two parameters:
 *    * target: the original object which you want to proxy.
 *    * handler: an object that defines which operations will be intercepted and how to redefine
 *                intercepted operations.
 *
 * For example, this code defines a simple target with just two properties, and an even simpler handler
 * with no properties:
 */

// const target = {
//   message1: 'hello',
//   message2: 'everyone',
// };

// const handler = {};

// const proxy1 = new Proxy(target, handler);

/**
 * Because the handler is empty, this proxy behaves just like the original target:
 */

// console.log(proxy1.message1);
// // -> hello
// console.log(proxy1.message2);
// // -> everyone

/**
 * To customise the proxy, we define functions on the handler object:
 */

// const target = {
//   message1: 'hello',
//   message2: 'everyone',
// };

// const handler2 = {
//   get: function (target, prop, receiver) {
//     return 'world';
//   },
// };

// const proxy2 = new Proxy(target, handler2);

/**
 * Here we've provided an implementation of the get() handler, which intercepts attempts to access properties
 * in the target.
 *
 * Handler functions are sometimes called traps, presumably they trap calls to the target object.
 * The very simple trap in handler2 above redefines all property accessors:
 */

// console.log(proxy2.message1);
// // -> world
// console.log(proxy2.message2);
// // -> world

/**
 * With the help of the Reflect class we can give some accessors the original behavior and redefine others:
 */

// const target = {
//   message1: 'hello',
//   message2: 'everyone',
// };

// const handler3 = {
//   get: function (target, property, receiver) {
//     if (property === 'message2') {
//       return 'world';
//     }
//     return Reflect.get(...arguments); // returns the value of the property
//   },
// };
// // ---------------------------------------------------

// // Same as:
// // const handler3 = {
// //   get: (target, property) => {
// //     return property === 'message2' ? 'world' : target[property];
// //   },
// // };

// const proxy3 = new Proxy(target, handler3);
// console.log(proxy3.message2);
// // -> world
// console.log(proxy3.message1);
// // -> hello
// console.log(proxy3.message3);
// // -> undefined
// ---------------------------------------------------------------------------------------------

/**
 * EXAMPLES
 */

/**
 * 1 - Basic example
 *
 * In this example, the number 37 gets returned as the default value when the property name is not
 * in the object. It is using the get() handler.
 */

// Defines an object
// let target = {
//   prop1: 'Hello',
//   prop2: 100,
// };

// // Declares a Proxy object
// const representative = new Proxy(target, {
//   get: (target, property) => {
//     return property in target ? target[property] : 37;
//   },
// });

// console.log(representative.prop1);
// // -> Hello
// console.log(representative.prop2);
// // 100
// console.log(representative.prop3);
// // -> 37
// ----------------------------------------

// Another solution:
// // Defines an object
// let target = {
//   prop1: 'Hello',
//   prop2: 100,
// };

// // Wrap the target object in an proxy
// target = new Proxy(target, {
//   get: (target, property) => {
//     return property in target ? target[property] : 37;
//   },
// });

// console.log(target.prop1);
// // -> Hello
// console.log(target.prop2);
// // -> 100
// console.log('prop3' in target, target.prop3);
// // -> false 37
// ---------------------------------------------------------------------------------------------

/**
 * 2 - Validation
 *
 * With a Proxy, you can easily validate the passed value for an object.
 * This example uses the set() handler.
 */

// // Declares an object named validator
// const validator = {
//   set: (target, property, value) => {
//     if (property === 'age') {
//       if (!Number.isInteger(value)) {
//         throw new TypeError('The age is not an integer.');
//       }
//       if (value > 200) {
//         throw new RangeError('The age seems invalid.');
//       }

//       // The default behavior to store the value
//       target[property] = value;

//       // Indicate success
//       return true;
//     }
//   },
// };

// // Declares an object
// const person = new Proxy({}, validator);

// // Tests
// person.age = 100;
// console.log(person.age);
// // -> 100

// // person.age = 'young';
// // -> Throws an exception

// person.age = 201;
// // -> Throws an exception
// ---------------------------------------------------------------------------------------------
