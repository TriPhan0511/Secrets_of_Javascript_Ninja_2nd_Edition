/** Chapter 10 - Regular Expression - Exercise */

/**
 * Exercise 01
 *
 * In Javascript, regular expressions can be created with which of the following?
 *  a. Regular expression literals
 *  b. The built-in RegExp constructor
 *  c. The built-in RegularExpression constructor
 *
 * Answer: Options a and b
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 02
 *
 * Which of the following is a regular expression literal?
 *  a. /test/
 *  b. \test\
 *  c. new RegExp('test')
 *
 * Answer: Option a
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 03
 *
 * Choose the correct regular expression flags
 *  a. /test/g
 *  b. g/test/
 *  c. new RegExp("test", "gi")
 *
 * Answer: Options a and c.
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 04
 *
 * The regex /def/ matches which of the following strings?
 *  a. One of the string d, e, f
 *  b. def
 *  c. de
 *
 * Answer: Option b: def
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 05
 * The regex /[^abc]/ matches which of the following?
 *  a. One of strings a, b, c
 *  b. One of strings d, e, f
 *  c. Matches the string ab
 *
 * Answer: Option b: One of strings d, e, f
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 06
 * Which of the following regex matches the string hello?
 *  a.  /hello/
 *  b.  /hell?o/
 *  c.  /hel*o/
 *  d.  /[hello]/
 *
 * Answer: All of options
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 07
 */

//  The regex /(cd)+(de)*/ matches which of the following strings?
/**
 *  a.  cd
 *  b.  de
 *  c.  cdde
 *  d.  cdcd
 *  e.  ce
 *  f.  cdcddedede
 */
/**
 *
 * Answer:
 *  a:  cd
 *  c:  cdde
 *  d:  cdcd
 *  f:  cdcddedede
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 08
 *
 * In regex, we can express alternatives with which of the following?
 *  a.  #
 *  b.  &
 *  c.  |
 *
 * Answer: Option c: |
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 09
 *
 * In the regex, /([0-9])2/, we can reference the first matched digit with which of the following?
 *  a.  /0
 *  b.  /1
 *  c.  \0
 *  d.  \1
 *
 * Answer: Option d: \1
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 10
 *
 * The regex /([0-5])6\1/ will match which of the following?
 * a. 060
 * b. 16
 * c. 261
 * d. 565
 *
 * Answer: Options a: 060 and d: 565.
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 11
 */

// The regex /(?:ninja)-(trick)?-\1/
/**
 *  a.  ninja-
 *  b.  ninja-trick-ninja
 *  c.  ninja-trick-trick
 */

/**
 * Answer: Option c: ninja-trick-trick
 */
// --------------------------------------------------------------------------------------------------

/**
 * Exercise 12
 *
 * What is the result of executing "012675".replace(/0-5/g, "a")
 *  a.  aaa67a
 *  b.  a12675
 *  c.  a1267a
 * Answer: "012675" (Nothing changes)
 */

// NOTE:
// If the regex is "012675".replace(/[0-5]g/, "a"):
// -> Option a: "aaa67a"
