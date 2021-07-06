/** 3.4.2 - Default parameters */

/**
 * Many web UI components (especially jQuery plugins) can be configured. For example,
 * if we're developing a slider component, we might want to give our users an option
 * to specify a timer interval after which one item is replace with another, as wel as an
 * animation that will be used as the change occurs. At the same time, maybe some users don't
 * care and are happy to use whatever settings we offer. Default parameters are ideal for this
 * situation!
 *
 * Our little example with slider component setting is just a specific case of a situation
 * in which ALMOST all function calls use the same value for a particular parameter (notice
 * the emphasis on alomost).
 * Consider a simpler case in which most of our ninjas are used to skulk around, but not Yagyu,
 * who cares only about simple sneaking.
 */

/**
 * In other programming languages, this problem is most often solved with function
 * overloading (specifying additional functions with the same name but a different
 * set of parameters). Unfortunately, Javascript doesn't support function overloading,
 * so when faced with this situation in the past, developers often resorted to something
 * like the following list
 */

/** Listing 3.8 - Taclking default parameters before ES6 */
// function performAction(ninja, action) {
//   action = typeof action === 'undefined' ? 'skulking' : action;
//   return ninja + ' ' + action;
// }

// assert(performAction('Fuma') === 'Fuma skulking', 'The default value is used for Fuma');
// assert(performAction('Yoshi') === 'Yoshi skulking', 'The default value is used for Yoshi');
// assert(performAction('Hattori') === 'Hattori skulking', 'The default value is used for Hattori');
// assert(
//   performAction('Yagyu', 'sneaking') === 'Yagyu sneaking',
//   'Yagyu can do whatever he pleases, even sneak!'
// );

/**
 * NOTE: The typeof operator returns a string indicating the type of the operand.
 *        If the operand isn't defined (for example, if we haven't supplied a matching
 *        argument for a function parameter), the return value is the string undefined.
 */

/**
 * This is a commonly occuring pattern that's tedious to write, so the ES standard has
 * added support for default parameters, as shown in the following listing:
 */

/** Listing 3.9 - Tackling default parameters in ES6 */
// function performAction(ninja, action = 'skulking') {
//   return `${ninja} ${action}`;
// }

// assert(performAction('Fuma') === 'Fuma skulking', 'The default value is used for Fuma');
// assert(performAction('Yoshi') === 'Yoshi skulking', 'The default value is used for Yoshi');
// assert(performAction('Hattori') === 'Hattori skulking', 'The default value is used for Hattori');
// assert(
//   performAction('Yagyu', 'sneaking') === 'Yagyu sneaking',
//   'Yagyu can do whatever he pleases, even sneak!'
// );

/**
 * We can assign any values to default parameters: simple, primitive values such as numbers or strings,
 * but also complex types such as objects, arrays, and even functions. These values are evaluated on
 * each function call, from left to right, and when assigning values to later default parameters, we
 * can reference previous parameter, as in the following listing
 */

/** Listing 3.10 - Referecing previous parameters */
// function performAction(ninja, action = 'skulking', message = `${ninja} ${action}`) {
//   return message;
// }

// assert(performAction('Yoshi') === 'Yoshi skulking', 'Yoshi is skulking');

/**
 * Even though Javascript allows you to do something like this, we urge caution. In our
 * opinion, this doesn't enhance code readability and should be avoided, whenever posible.
 * But moderate use of default parameters - as a means of avoiding null values, or as relatively
 * simple flags that configure the behaviors of our functions - can lead to much simpler and more
 * elegant code.
 */

/**
 * EXERCISES
 */

/** 1 */
// sortAsc, handleClick functions

/** 2 */
// function declaration: outer, inner
// function expression: sortAsc, function(){}
// arrow function: (a, b) => b - a, () => 'Yoshi'

/** 3 */
// samurai = Tomoe
// ninja = undefined

// let ninja = (() => {
//   // 'Yoshi';
//   return 'Yoshi';
// })();

// console.log(ninja);

/** 4 */
/** first calling: a = 1, b = 2, c = [3, 4, 5] */
/** second calling: a = undefined, b = undefined, c = [] */

/** 5 */
// message1 = 'Yoshi katana'
// message2 = 'Yoshi wakizashi'
