/** 10.2.1 - Regular expression explained */

/**
 * The term regular expression stems from mid-century mathematics, when a
 * mathematician named Stephen Kleene described models of computational automato
 * as "regular sets". But that won't help us understand about anything about
 * regular expressions, so let's simplify things and say that a regular expression
 * is a way to express a pattern for matching strings of text. The expression itself
 * consists of terms and operator that allow us to define these patterns. We'll see
 * what those terms and operators consist of shortly.
 *
 * In Javascript, as with most other object types, we have two ways to create a
 * regular expression:
 *
 *  _ Via a regular expression literal.
 *
 *  _ By constructing an instance of a RegExp object.
 *
 * For example, if we want to create a mundane regukar expression (or regex, for short)
 * that matches the string test exactly, we could do so with regex literal:
 * 
      const pattern = /test/;
 * 
 * That might look strange, but regex literals are delimited with forward slashes in the
 * same way that string literals are delimited by quote characters.
 * 
 * Alternatively, we could construct a RegExp instance, passing a regex as a string:
 * 
      const pattern = new RegExp('test');
 * 
 * Both formats result in the same regex being created in the variable pattern.
 */

/**
 * TIP:
 * The literal syntax is preferred when the regex is known at development time,
 * and the constructor approach is used when regex is constructed at runtime
 * by building it up dynamically in a string.
 */

/**
 * One of the reasons that the literal syntax is preferred over expressing regexes in a string
 * is that the backslash characters plays an important part in regular expressions. But the
 * backslash character is also the escape character for string literals, so to express a
 * backslash character within a string literal, we need to use a double backslash (\\). This
 * can make regular expressions, which already possess a cryptic syntax, even more odd-looking
 * when expressed within strings.
 */

/**
 * In addition to the expression itself, five flags can be associated with a regex:
 *
 *  1.  i - Makes the regex case-insensitive, so /test/i matches not only test, but also
 *      Test, TEST, tEsT, and so on.
 *
 *  2.  g - Matches all instances of the pattern, as opposed to the default of local, which
 *      matches only the first occurrence. More on this later.
 *
 *  3.  m - Allows matches across multiple lines, as might be obtained from the value of a
 *      textarea element.
 *
 *  4.  y - Enables sticky matching. A regular expression performs sticky matching in the
 *      target string by attempting to match from the last match position.
 *
 *  5.  u - Enables the use of Unicode point escapes (\u{...}).
 */

/**
 * These flags are appended to the end of the literal (for example, /test/ig) or passed
 * in a string as the second parameter to the RegExp constructor (new RegExp("test", "ig")).
 */

/**
 * Matching the exact string test (even in case-insensitive manner) isn't interesting - after
 * all, we can do that particular chec with a simple string comparison. So let's take a look
 * at the terms and operators that give regular expressions their immense power to match more
 * compelling patterns.
 */
