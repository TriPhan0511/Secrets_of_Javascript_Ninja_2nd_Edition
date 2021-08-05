/** 10.6.1 - Matching newlines */

/**
 * When performing a search, it's sometimes desirable for a period (.) term, which
 * matches any character except for newline, to also newline character.
 *
 * Regular expression implementations in other languages frequently include a flag
 * for making this possible, but Javascript implementation doesn't.
 */

/**
 * Let's look at a couple ways of getting around this omission in Javascript, as
 * shown in the nect listing.
 */

/** Listing 10.11 - Matching all characters, incuding newlines */

// Defines a test subject
const html = '<b>Hello</b>\n<i>world!</i>';

// Shows the newline aren't matched
assert(/.*/.exec(html)[0] === '<b>Hello</b>', "A normal capture doesn't handle endlines.");

// Matches all using whitespace matching
assert(
  /[\S\s]*/.exec(html)[0] === '<b>Hello</b>\n<i>world!</i>',
  'Matching everything with a character set.'
);

// Matches all using alternation
assert(
  /(?:.|\s)*/.exec(html)[0] === '<b>Hello</b>\n<i>world!</i>',
  'Using a non-capturing group to match everything.'
);

/**
 * This example defines a test subject string: '<b>Hello<b>\n<i>world!</i>', containing
 * a newline. Then we try various ways of matching all the characters in the string.
 */

// In the first test:
// /.*/.exec(html)[0] === '<b>Hello</b>',
// we verify that newlines aren't matched by the . operator
// ---------------------------------------------------------------------------------------

// In the second test we get our way with an alternative regex:
// /[\S\s]*/.exec(html)[0] === '<b>Hello</b>\n<i>world!</i>'
// /[\S\s]*/, in which we
// define a character class that match anything that's not a whitespace character and
// anything that is a whitespace character. This union is the set of all characters.
// ---------------------------------------------------------------------------------------

// In the third test:
// /(?:.|\s)*/.exec(html)[0] === '<b>Hello</b>\n<i>world!</i>'
// we use an alternation regex, /(?:.|\s)*/, in which we matched everything matched by ., which
// is verything but newline, and everything considered whitespace, which includes newline.
// The resulting union is the set of all characters including newlines. 
// Note that the use of passive subexpression to prevent any unintended captures. Because of its 
// simplicity (and implicit speed benefits), the solution provided by /[\S\s]*/ is generaly
// considered optimal.

/** Next, let's take a step to widen our view to worldwide scope. */
