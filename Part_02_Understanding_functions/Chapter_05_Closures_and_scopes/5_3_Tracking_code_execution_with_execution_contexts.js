/** 5.3 - Tracking code execution with execution contexts */

/**
 * In Javascript, the fundamental unit of execution is a function. We us them all the time,
 * to calculate something, to perform side effects such as changing the UI, to achieve
 * code reuse, or to make code easier to understand. To fulfill its purpose, a function can
 * call another function, and so on. And when a function does its thing, our program
 * execution has to return to the position from which the function was called. But have
 * you ever wondered how the Javascript engine keeps track of all these executing functions
 * and return positions?
 *
 * As we metioned in chapter 2, there are two main types of Javascript code: global code,
 * placed outside all functions, and function code, contained in functions. When our code
 * is being executed by Javascript engine, each statement is executed in a certain
 * execution context.
 *
 * And just as we have two types of code, we have two types of execution context:
 * a global execution context and a function execution context. Here's the significant difference:
 * There's only one global execution context, created when our Javascript program starts executing,
 * whereas a new function execution context is created on each function invocation.
 */

/**
 * NOTE:
 * You may recall from the chapter 4 that function context is the object on which our function
 * is invoked, which can be accessed through the this keyword. An execution context, although
 * it has a similar name, is a completely different thing. It's an internal Javascript concept
 * that the Javascript engine uses to track the execution of our functions.
 */

/**
 * As we mentioned in chapter 2, Javascript is based on a single-threaded execution model:
 * Only one piece of code can be executed at a time. Every time a function is invoked,
 * the current execution context has to be stopped, and a new function execution context,
 * in which the function code will be evaluated, has to be created. After the function peforms
 * its task, its function execution context is usually discarded, and the caller execution
 * context restored. So there's need to keep track of all these execution contexts - both the
 * one that's executing and the ones that are patiently waiting. The easiest way to do this is
 * by using a stack, called execution context stack (or often called a call stack).
 */

/**
 * NOTE:
 * A stack is a fundamental data structure in which you can put new items only to the top and
 * can take existing items only from the top. Think of stack of trays in a cafeteria. When you
 * want to take one, you pick one from the top. And a cafeteria worker who has a new clean one
 * laso puts it on the top.
 */

/**
 * This might seem vague, so let's look at the following code, which reports the activity of
 * two skulking ninjas.
 */

/** Listing 5.5 - The creation of execution contexts */

// A function that calls another function
function skulk(ninja) {
  report(`${ninja} skulking`);
}

// A function that reports a message
// through the built-in console.log function
function report(message) {
  console.log(message);
}

// Two function calls from global scope
skulk('Yuma');
skulk('Yoshi');

/**
 * This code is straightforward; we define the skulk function, which calls the report function,
 * which outputs a message. Then, from global scope, we make two separate calls to the skulk function:
 * skulk('Yuma') and skulk('Yoshi')
 */

/**
 * When executing the example code, the execution context behaves as follows:
 *
 *  1. The execution context stack starts with the global execution context that's created only once
 *      per Javascript program (once per page in the case of web pages). The global execution context
 *      is the active execution context when executing global code.
 *
 *  2. In global code, the program first defines two functions: skulk and report, and then calls the
 *      skulk function with skulk('Kuma'). Because only one piece of code can be executed at once,
 *      the Javascript engine pauses the exection of the global code, and goes to execute the skulk
 *      function code with Kuma as an argument. This is done by creating a new function execution
 *      context and pushing it on top of the stack.
 *
 *  3. The skulk function, in turn, calls the report function with the argument Kuma skulking. Again,
 *      because only one piece of code can be executed at a time, the skulk execution context is paused,
 *      and a new function context for the report function, with the argument Kuma skulking, is created
 *      and pushed onto the stack.
 *
 *  4. After the report function log a message by using the built-in console.log function and finishes
 *      its execution, we have to go back to the skulk function. This is done by popping the report
 *      function execution context from the stack. The skulk function execution context is then
 *      reactivated, and the execution of the skulk function continues.
 *
 *  5. A similar thing happens when the function finishes its execution: The function execution context
 *      of the skulk function is removed from the stack,a dn the globacl execution context, which has been
 *      patiently waiting this whole time, is restored as the active execution context. The execution of
 *      global Javascript is restored.
 */

/**
 * This whole process is repeated in a similar way for the second call to the skulk function,
 * now with the argument Yoshi. Two new execution contexts are created and pushed to the stack,
 * skulk('Yohsi') and report('Yoshi skulking'), when the respective functions are called.
 * These execution contexts are also popped off the stack when the program returns from the matching
 * function.
 *
 * Even though the execution context stack is an internal Javascript concept, you can explore it in any
 * Javascrip debugger, where it's referred to as a call stack.
 */


/**
 * Besides keeping track of the position in the application execution, the execution context is vital
 * in identifier resolution, the process of figuring out which variable a certain identifier refers to.
 * The execution context does this via the lexical environmnet.
 */