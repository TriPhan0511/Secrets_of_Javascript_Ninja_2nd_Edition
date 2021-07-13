/** 5.4 - Keep track of identifiers with lexical environments */

/**
 * A lexical environment is an internal Javascript engine construct used to keep track of
 * the mapping from identifiers to specific variables. For example, consider the following code:
 */

let ninja = 'Hattori';
console.log(ninja);

/**
 * The lexical environment is consulted when the ninja variable is accessed in the
 * console.log statement.
 */

/**
 * NOTE:
 * Lexical environments are internal implementation of the Javascript scoping mechanism, and
 * people often colloquially refer to them as scopes.
 */

/**
 * Usually, a lexical environment is associated with a specific structure of Javascript code.
 * It can be associated with a function, a block of code, or the catch part of a try-catch
 * statement. Each of these structures (functions, blocks, and catch parts) can have its own
 * separate identifier mappings.
 */

/**
 * NOTE:
 * In pre-ES6 versions of Javascript, a lexical environment could be associated with only a function.
 * Variables could be only function scoped. This caused a lot of confusion. Because Javascript is a
 * C-like language, people coming from other C-like languages (such as C++, C#, or Java) natuarally
 * expected some low-level concepts, such as the existence of block scopes, to be the same. With ES6,
 * this is finally fixed.
 */
