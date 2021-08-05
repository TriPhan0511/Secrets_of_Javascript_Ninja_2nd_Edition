/** 10.6.2 - Matching Unicode */

/**
 * Frequently in the use of regular expressions, we want to match alphanumeric characters,
 * such as an ID selector in a CSS engine implementation. But assuming that the alphabetic
 * will be from only the set of English  ASCII characters is shortsighted.
 *
 * Expanding the se to include Unicode character is something desirable, explicitly
 * supporting multiple languaeges not covered by traditional alphanumeric character set
 * (see the following listing).
 */

// const string = 'Hello, world';
// const pattern = /\w+/g;

// let matches = string.match(pattern);
// assert(matches[0] === 'Hello', matches[0]);
// assert(matches[1] === 'world', matches[1]);
// -------------------------------------------------

/** Listing 10.12 - Matching Unicode characters */

// const text = '\u5FCD\u8005\u30D1\u30EF\u30FC';
// const matchAll = /[\w\u0080-\uFFFF_-]+/;
// assert(text.match(matchAll), 'Our regex matches non-ASCII.');
// -------------------------------------------------

/**
 * This listing includes the entire range of Unicode characters in the match by creating
 * a character class that includes the \w term, to match all the "normal" word characters,
 * plus a range that spans the entire set of Unicode characters above U+0080. Starting at
 * 128 gives us some high ASCII character along with all Unicode characters in
 * the Basic Multilingual Plane.
 *
 * The astute among you might note that by adding the entire range of Unicode characters
 * above \u0080, we match not only alphabetic characters, but also all Unicode punctuation
 * and other special characters (arrows, for example). But that's okay, because the point
 * of the example is to show how to match Unicode characters in general. If you have a
 * specific range of characters that you want to match, you can use the lesson of this example
 * to add whatever range you wish to the character class.
 */
// -------------------------------------------------------------------------------------------------------------

// // Another example
const string = 'Xin chào';
const pattern = /[\w\u0080-\uFFFF_-]+/g;
let matches = string.match(pattern);

assert(matches[0] === 'Xin', 'The first match. ');
assert(matches[1] === 'chào', 'The second match.');
// -------------------------------------------------

/**
 * In Javascript, the identifiers and string literals can be expressed in Unicode via 
 * a Unicode escape sequence. 
 * 
 * The general syntax is \uXXXX, where X denotes four hexadecimal digits.
 * For example, the letter "o" is denoted as \u006F in Unicode. Hence, to write the
 * letter "foo" in Unicode, we can use following code.
 * 
 * Example: Unicode in Javascript source code
        let f\u006F\u006F = 'abc';
        console.log(foo);
 * 
 * Example: Unicode in Javascript strings
 * 
        let aWord = 'f\u006F\u006F';
        console.log(aWord);
        // -> foo
 */
