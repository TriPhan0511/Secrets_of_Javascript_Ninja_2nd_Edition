/** Chapter 04 - Understanding function invocation  */

/**
 * This chapter covers
 *  1. Two implicit function parameters: arguments and this
 *  2. Ways of invoking functions
 *  3. Dealing with problems of function contexts
 */

/**
 * In this chapter, we we are discussing something that we kept from you in the previous chapter:
 * the implicit function parameters this and arguments. These are silently passed to functions and
 * can be accessed just like any other explicitly named function parameter within the function's body.
 */

/**
 * The this parameter represents the function context, the object on which our function is invoked,
 * whereas the arguments parameter represents all arguments that are passed in through a function call.
 * Both parameters are vital in Javascript code.
 * The this parameter is one of the fundamental ingredients of object-oriented Javascript, and
 * the arguments parameter allow us to be creative with the arguments that are accepted by our functions.
 * For this reason, we'll explore some of the common pitfalls related to these implicit arguments.
 *
 * We'll then continue by exploring ways of invoking functions in Javascript. The way
 * in which we invoke a function has a great influence on how the implicit function parameters
 * are determined.
 * 
 * Finnaly, we'll conclude the chapter by learning about common gotchas related to 
 * the function context, the this parameter
 */
