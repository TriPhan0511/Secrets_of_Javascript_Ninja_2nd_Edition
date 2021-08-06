/** Link: https://javascript.info/regexp-greedy-and-lazy */

/**
 * Task 1
 *
 * What's the match here?
 * report('123 456'.match(/\d+? \d+?/g))
 *
 * Answer: 123 4
 */
// -------------------------------------------------------

/**
 * Task 2:
 *
 * Find all HTML comments in the text
 */

// let str = `... <!-- My -- comment
// test --> .. <!---->..
// `;
// // Way 1:
// // let regexp = /<!--[\S\s]*?-->/g;

// // Way 2:
// let regexp = /<!--.*?-->/gs; // Use the s flag (s modifier: single line. Dot matches newline charaters)

// report(str.match(regexp));
// // -> <!-- My -- comment \n test -->, <!---->
// -------------------------------------------------------

/**
 * Task 3:
 *
 * Find HTML tags
 *
 * Create a regex to find all (opening and closing) HTML tags with their attributes
 */

// // let regexp = /<(?:\/|\w+)\s?[^>]*?>/g; // Note: ?: -> non-capturing (or passive subexpression)

// let str = '<> <a href="/"> <input type="radio" checked> <b>';

// let str2 = '<> </> <i class="myClass">Hello</i> <a href="/"> <input type="radio" checked> <b>';

// report(str.match(regexp));
// // -> '<a href="/">', '<input type="radio" checked>', '<b>'

// report(str2.match(regexp));
// // -> </>,<i class="myClass">,</i>,<a href="/">,<input type="radio" checked>,<b>
// -----------------------------------------------------------------------------------------------------------------------------------------
