/**
 * Greedy and lazy quantifiers
 * Link: https://javascript.info/regexp-greedy-and-lazy
 */
/**
 * Example 01
 *
 * We have a text and need to replace or quotes "..." with guillemet marks: <<...>>.
 * They are prefered for typography in many countries.
 * For instance: "Hello, world" should become <<Hello, world>>
 *
 */

/** WAY 1: USING LAZY MODE */

// --------------------------------------------------------------

// GREEDY mode (default)

// // Declares a test subjest
// const string = 'a "witch" and her "boom" is one';

// const newString = string.replace(/"(.+)"/g, '<<$1>>');
// -> a <<witch" and her "boom>> is one -> WRONG!
// ---------------------------------------------------------------

// LAZY (non-greedy) mode (activate by using ? operator)

/**
 * The lazy mode of quantifiers is an opposite to the greedy mode.
 * It means: "repeat minimal number of times".
 *
 * We can enable it by putting a question mark '?' after the quantifier,
 * so that it becomes *? or +? or even ?? for '?'.
 *
 * To make things clear: usually a question mark ? is a quantifier by itself (zero or one),
 * but if it was added after another quantifier (or even itself), it gets aother meaning - it
 * switches the matching mode from greedy to lazy.
 *
 * The regex /".+?"/ works as intended: it finds "switch" and "boom".
 */

// // Declares a test subjest
// const string = 'a "witch" and her "boom" is one';

// const newString = string.replace(/"(.+?)"/g, '<<$1>>');
// -> a <<witch>> and her <<boom>> is one -> RIGHT

// Display the new string
// report(newString);
// -------------------------------------------------------------------------------------------------------

/** WAY 2:  */

/**
 * In our case, we can find quoted strings without lazy mode
 */

// const string = 'a "switch" and her "boom" is one';

// report(string.replace(/"([^"]+)"/g, '<<$1>>'));
// // -> a <<switch>> and her <<boom>> is one
// -------------------------------------------------------------------------------------------------------

/**
 * Example 2:
 *
 * We want to find links of the form <a href="..." class="myClass">, with any href
 */

// const string =
//   '<p><a href="myLink1" class="myClass">Click here 1</a><a href="myLink2" class="myClass">Click here 2</a><a href="myLink3">Click here 3</a></p>';

// const pattern = /<a href="[^"]*".*?>/g;

// let matches = string.match(pattern);

// matches.forEach(report);
// --------------------------------------------------------------------------------------

/** Example 2.1 */
// const str = '...<a href="link" class="doc">...';
// const regexp = /<a href=".*" class="doc">/g;

// report(str.match(regexp));
// // -> <a href="link" class="doc">
// -------------------------------------------------------------------

/** Example 2.2 : There are many links in the text */
// const str = '...<a href="link1" class="doc">...<a href="link2" class="doc">...';
// const regexp = /<a href=".*?" class="doc">/g; // Uses lazy mode

// report(str.match(regexp));
// // -> <a href="link1" class="doc">,<a href="link2" class="doc">
// -------------------------------------------------------------------

/** Example 2.3 : One more text input */
const str1 = '...<a href="link1" class="wrong">...<p style="" class="doc">...';
const str2 = '...<a href="link1" class="doc">...<p style="" class="doc">...';
const regexp = /<a href="[^"]*" class="doc">/g; //

report(str1.match(regexp));
// -> null

report(str2.match(regexp));
// -> <a href="link1" class="doc">
