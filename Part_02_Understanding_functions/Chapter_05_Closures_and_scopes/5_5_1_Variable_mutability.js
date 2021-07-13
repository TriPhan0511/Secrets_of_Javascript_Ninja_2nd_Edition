/** 5.5 - Understanding types of Javascript variables */

/**
 * In Javascript, we can use three keywords for defining variables: var, let, and const.
 * They differ in two aspects: mutability and their relationship toward the lexical environment.
 */
// -----------------------------------------------------------------------------------------------------

/** 5.5.1 - Variable mutability */

/**
 * If we were do divide variable declaration keywords by mutability, we'd put const on one side and
 * var and let on the other side. All variables defined with const ar immutable, meaning that their
 * value can be set only once. On the other hand, variables defined with keywords var and let are
 * typical run-of-the-mill variables, whose value we can change as many times as necessary.
 *
 * Now let's dive into how const variables work and behave.
 */

/** CONST VARIABLES */

/**
 * A const "variable" is similar to a normal variable, with the exception that we have to provide
 * an initialization value when it's declared, and we can't assign a completely new value to it
 * afterward. Hmmm, not very variable, is it?
 */

/**
 * Const variables are often used for two slightly different purpose:
 *
 *  _ Speciying variables that shouldn't be reassigned.
 *
 *  _ Referencing a fixed value, for example, the maximum number of ronin in a squad, MAX_RONIN_COUNT,
 *    by name, instead of using a literal number such as 234. This makes our program easier to understand
 *    and maintain. Our code isn't filled with seemingly arbitray literals (234), but with meaningful names
 *    (MAX_RONIN_COUNT) whose values are specified in only one place.
 */

/**
 * In either case, because const variables aren't meant to be reassigned during program execution,
 * we've safeguarded our code against unwanted or accidental modifications and we've even made it
 * possible for the Javascript engine to do some performance optimizations.
 *
 * The following listing illustrate the behavior of const variables.
 */

/** Listing 5.6 - The behavior of const variables */

// Defines a const variable and verifies that the value is assigned.
const firstConst = 'samurai';
assert(firstConst === 'samurai', 'firstConst is a sumurai.');

// Attempting to assign a new value to a const variable throws an exception.
try {
  firstConst = 'ninja';
  fail("Shouldn't be here");
} catch (e) {
  pass('An exception has occured.');
}

assert(firstConst === 'samurai', 'firstConst is still a samurai.');

// Creates a new const and assignd a new object to it
const secondConst = {};

// We can't assign a completely new object to the secondConst variable, but
// there's nothing stop us from modifying the one we already have.
secondConst.weapon = 'wakizashi';
assert(secondConst.weapon === 'wakizashi', 'We can add new properties.');

// The exact same thing holds for arrays
const thirdConst = [];
assert(thirdConst.length === 0, 'No items in our array.');

thirdConst.push('Yoshi');
assert(thirdConst.length === 1, 'The array has changed.');

/**
 * And that's about it. const variables aren't that complicated to begin with. You only
 * have to remember that a value of a const variable can be set only on initialization
 * and that we can't assign a completely new value later. We can still modify the existing
 * value; we just can't completely override it.
 */
