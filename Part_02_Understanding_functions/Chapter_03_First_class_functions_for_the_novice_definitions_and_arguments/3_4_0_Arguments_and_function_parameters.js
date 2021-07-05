/** 3.4 - Arguments and function parameters */

/**
 * When discussing functions, we often use the terms argument and parameter almost interchangeably,
 * as if they were nore and less the same thing. But now, let's be more formal:
 *
 *    * A PARAMETER is a variable that we list as part of a function definition.
 *    * A ARGUMENT is a value that we pass to the function when we invoke it.
 *
 */

// Example: The difference between function parameters and function arguments

function skulk(ninja) {
  return performAction(ninja, 'skulking');
}
// "the first" ninja: function parameter
// "the second" ninja, skulking: function arguments

function performAction(person, action) {
  return `${person} - ${action}`;
}
// person, action: function parameters

const rule = (daimyo) => performAction(daimyo, 'ruling');
// "the first" daimyo: function parameter
// "the second" daimyo, ruling: function arguments

// Calls functions
skulk('Hattori'); // Hattori: function argument
rule('Oda Nobunaga'); // Oda Nobunaga: function argument

/**
 * When a list of arguments is supplied as a part of a function invocation, these arguments
 * are assigned to the parameters in the function definition in the order specified.
 * The first argument gets assigned to the first parameter, the second argument to the second
 * parameter, and so on.
 *
 * If we have a different number of arguments than parameters, no error is raised.
 * Javascript is perfectly fine with this situation and deals with it in the following ways.
 * If more arguments are supplied than there are parameters, the "excess" arguments aren't
 * assigned to parameter names. For example, see figure 3.8:
 */

/**
 * Figure 3.8 - Arguments are assigned to function parameters in the order specified.
 *                Excess argumnets aren't assigned to any parameters
 */

// Calls the pratice function with four arguments
practice('Yoshi', 'sword', 'shadow sword', 'katana');

// Defines practice function (three parameters)
function practice(ninja, weapon, technique) {}

// Calls the practice function with only one argument
practice('Yoshi');

/**
 * Figure 3.8 shows that if we were to call the practice function with:
 *
 *    practice('Yoshi', 'sword', 'shadow sword', 'katana');
 *
 * The arguments Yoshi, sword, and shadow sword would be assigned to the
 * parameters ninja, weapon, and technique, respectively.
 * The argument katana is an excess argument, and wouldn't be assigned to any parameter.
 * In the next chapter, you'll see that even though some arguments aren't assigned to parameter names,
 * we still have a way to access them.
 */

/**
 * On the other hand, if we have more parameters than arguments, the parameters that have no corresponding
 * argument are set to undefined. For example, if we were to make the call :
 *
 *    practice('Yoshi');
 *
 * the parameter ninja would be assigned the value Yoshi, while the parameters weapon and technique would be
 * set to undefined.
 */

/**
 * Dealing with function argumnets and parameters is as old as Javascript itself, but now
 * let's explore two new features of Javascript bestowed by ES6: rest and default parameters
 */
