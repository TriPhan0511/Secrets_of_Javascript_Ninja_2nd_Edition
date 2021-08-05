/** 10.6.3 - Matching escaped characters */

/**
 * It's common for page authors to use names that conform to program identifiers when
 * assigning id values to page elements, but that's just a convention; id values can
 * contain characters other than "word" characters, including punctuation. For example,
 * a web developer might use the id value form:update for an element.
 *
 * A library developer, when writing an implementation for, say, a CSS selector engine,
 * would like to support escaped characters. This allows the user to specify complex names
 * that don't conform to typical naming conventions. So let's develop a regex that will
 * allow matching escaped characters. Consider the following code.
 */

/** Listing 10.13 - Matching escaped characters in a CSS selector */

// This regex allows any sequence composed of word characters,
// a backslash followed by any character (even a backslash), or both.
const pattern = /^((\w+)|(\\.))+$/;

// Sets up various test subjetcs/
// All should pass but the last, which fails to escape its nonword character (:)
const tests = [
  'formUpdate',
  'form\\.update\\.whatever',
  'form\\:update',
  '\\f\\o\\r\\m\\u\\p\\d\\a\\t\\e',
  'form:update',
];

// Runs through all the test subjects
for (const item of tests) {
  assert(pattern.test(item), `${item} is a valid identifier.`);
}

/**
 * This particular expression works by allowing for a match of either a word character sequence or
 * a sequence of a backslash followed by any character.
 */
