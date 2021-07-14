/** 5.5.3 - Registering identifiers within lexical environments */

/**
 * One of the driving principles behind the design of Javascript as a programmng language
 * was its ease to use. That's one of the main reasons for not specifying function return
 * types, function parameter types, variable types, and so on. And you already know that
 * Javacript code is executed line by line, in a straightforward fashion. Consider the following:
 */

// firstRonin = 'Kiyokawa';
// secondRonin = 'Kondo';

/**
 * The value Kiyokawa is assigned to the identifier firstRonin, anf then the value Kondo is assigned
 * to the identifier secondRonin. There's nothing weird about that, right? But take a look at another
 * example:
 */

// const firstRonin = 'Kiyokawa';

// check(firstRonin);

// function check(ronin) {
//   assert(ronin === 'Kiyokawa', 'The ronin was checked!');
// }

/**
 * In this case, we assign the value Kiyokawa to the indentifier firstRobin, and then we call the check
 * function with the identifier firstRonin as a parameter. But hold on a second - if the code is executed
 * line by line, should we be able to call the check function? Our program execution hasn't reached its
 * declaration, so the Javascript engine shouldn't even know about it.
 */

/**
 * But everything is fine and well. Javascript isn't to picky about where we define our functions. We can
 * choose to place function declarations before or even after thei respective calls. This isn't something
 * that the developer should need to fuss about.
 */
// ---------------------------------------------------------------------------------------------------------

/** THE PROCESS OF REGISTERING IDENTIFIERS */

/**
 * But ease of use aside, if code is executed line by line, how did the Javascript engine know that a function
 * named check exists? It turns out that the Javascript engine "cheats" a little, and that execution
 * of Javascript code occurs in two phases.
 *
 * The first phase is activated whenever a new lexical environment is created. In this phase, the code isn't
 * executed, but Javascript engine visits and register all declared variables and functions withinn the
 * current lexical environment. The second phase, Javascript execution, starts after this has been accomplished;
 * the exact behavior depends on the type of variable (let, var, const, function declaration) and the type of
 * environment (global, function, or block).
 *
 * The process is as follows:
 *
 *  1.  If we're creating a function environment, the implicit arguments identifier is created,
 *      long with all formal function parameters and their argument values. If we're dealing
 *      with a nonfunction environment, this step is skipped.
 *
 *  2.  If we're creating a global or a function environment, the current code is scanned (without
 *      going into the body of another functions) for function declarations (but not function expression
 *      or arrow functions!). For each discovered function declaration, a new function is created and
 *      bound to an identifier in the environment with the function's name. If that identifier name
 *      already exists, its value is overwritten. If we're dealing with block environment, this step
 *      is skipped.
 *
 *  3.  The current code is scanned for variable declarations. In function and global environments,
 *      all variables declared with the keyword var and defined outside other functions (but they
 *      can be placed within blocks!) are found, and all variables declared with the keywords let
 *      and const defined outside other functions and blocks are found. In block environments,
 *      the code is scanned only for variables with the keywords let and const, directly in the
 *      current block. For each discovered variable, if the identifier doesn't exist in the environment,
 *      the identifier is registered and its value initialized to undefined. But if the identifier exists,
 *      it's left with its value.
 */
// ---------------------------------------------------------------------------------------------------------

/** CALLING FUNCTIONS BEFORE THEIR DECLARATIONS */

/**
 * One of the features that makes Javascript pleasant to use is that the order of function definitions
 * doesn't matter. In Javascript, we can call a function even before it's formally declared.
 *
 * Check out the following listing.
 */

/** Listing 5.9 - Accessing a function before its declaration */

// // We can access a function that isn't yet defined,
// // if the function is defined as a function declaration.
// assert(
//   typeof fun === 'function',
//   "fun is a function even though its definition isn't reached yet!"
// );

// // We can't access functions that are defined as function expression
// // or arrow function.
// assert(typeof myFunExp === 'undefined', 'But we cannot access function expressions');
// assert(typeof myArrow === 'undefined', 'Nor arrow functions.');

// // The fun function is defined as a function declaration.
// function fun() {}

// // myFunExp points to a function expression
// // and myArrow to an arrow function
// var myFunExp = function () {};
// var myArrow = (x) => x;

/**
 * We can access the function fun even before we've defined it. We can do this because fun is defined
 * as function declaration, and the second step (listed previously in this section) indicates that
 * functions created with function declarations are created and their identifiers registered when the
 * current lexical environment is created, before any Javascript code executed. So even before we start
 * executing our assert call, the fun function already exists.
 *
 * The Javascript engine does this to make things easier for us as developers, allowing us to
 * forward-reference and not burdening us with exact order for placing functions. Functions already
 * exist at the time our code starts executing.
 *
 * Notice that this holds only for function declarations. Function expressions and arrow functions
 * aren't part of this process, and are created when the program execution reaches their definitions.
 * This is why we can't access myFunExp and myArrow functions.
 */
// ---------------------------------------------------------------------------------------------------------

/** OVERRIDING FUNCTIONS */

/**
 * The next conundrum to tackle is the problem of overriding function identifiers. Let's take a look
 * at another example.
 */

/** Listing 5.10 - Overriding function identifiers */

// fun refers to a function.
assert(typeof fun === 'function', 'We access the function.');

// Defines a variable fun and assigns a number to it
var fun = 3;

// fun refers to a number
assert(typeof fun === 'number', 'Now we access the number.');

// A fun function declaration
function fun() {}

// fun still refers to a number
assert(typeof fun === 'number', 'Still a number');

/**
 * In this example, a variable declaration and a function declaration have the same name: fun.
 * If you run this code, you'll see that both asserts pass. In the first assert, the identifier fun
 * refers to a function; and in the second and third, fun refers to a number.
 *
 * This behavior follows as a direct consequence of the steps taken when registering identifiers.
 * In the second step of the outlined process, functions defined with function decalrations are
 * created and associated to their identifiers before any code is evaluated; and in the third step,
 * variable declarations are processed, and the value undefined is associated to identifiers that
 * haven't yet encountered in the current environment.
 *
 * In this case, because the identifier fun has been encountered in the second step when function
 * declaration are registered, the value undefined isn't assigned to the variable fun. This is why
 * the first assertion, testing whether fun is a function, passes. After that, we have an assigment,
 * var fun = 3, which assigns the number 3 to the identifier fun. By doing this, we lose the reference
 * to the function, and from then on, the identifier fun refers to a number.
 *
 * During the actual program execution, function declarations are skipped, so the definiton of the fun
 * function doesn't have any impact on the value of the fun identifier.
 */
// ---------------------------------------------------------------------------------------------------------

/** VARIBALE HOISTING */

/**
 * If you've read a bunch of Javascript blogs or books explaining identifier resolution,
 * you;'ve probably run into the term hoisting - for example, variable and function declarations
 * are hoisted, or lifted, to the top of a function or global scope.
 *
 * As youve seen, though, that's a simplistic view. Variables and function declarations are
 * technically not "moved" anywhere. They're visited and registered in lexical environment
 * before any code is executed. Although hoisting, as it's most often defined, is enough to
 * provide a basic  understanding of how Javascript scoping works, we've gone much deeper than
 * that by looking at lexical enviroment, taking another step on the path of becoming a true
 * Javascript ninja.
 */
