/** 10.2.2 - Terms and operators */
/**
 * Regular expressions, like most other expressions we're familar with, are made up of
 * terms and operators that qualify those terms. In the section that follows, you'll see
 * how these terms and operators can be used to express patterns.
 */
// --------------------------------------------------------------------------------------------------
/** EXACT MATCHING */
/**
 * Any character that's not a special character or operator (which we'll introduce as we go along)
 * must appear literally in the expression.
 * For example, in our /test/ regex, four terms represent characters that must appear literally in
 * a string for it match the expressed pattern.
 *
 * Placing such characters one after the other implicitly denotes an operation that means followed by.
 * So /test/ means t followed by e followed by s followed by t.
 */
// --------------------------------------------------------------------------------------------------
/** MATCHING FROM A CLASS OF CHARACTERS */
/**
 * Many times, we won't want to match a specific literal character, but a character from a finite
 * set of characters. We can specify this with the set operator (also called the character class operator)
 * by placing the set of characters that we want to match in square brackets: [abc].
 */
/**
 * The preceding example signifies that we want to match any of characters a, b, or c. Note that even though
 * this expression spans five characters (three letters and two brackets), it matches ony a single character
 * in the candidate string.
 */
/**
 * Other times, we want to match anything but a finite set of characters. We can specify this by placing
 * a caret (^) after the opening bracket of the set operator: 
 * 
      [^abc]
 * 
 * This changes the meaning to any character but a, b, or c.
 */
/**
 * There's one more invaluable variation to the set operator: the ability to specify a range of values.
 * For example,if we want to match any one of lowercase characters between a and m, we could write:
 * [abcdefghijklm]. But we can express that much more succinctly as follows:
 * 
      [a-m]
 * 
 * The dash indicates that all charcters from a through m inclusive (and lexicographically) are included 
 * in the set.
 */
// --------------------------------------------------------------------------------------------------
/** ESCAPING */
/** Not all character represent their literal equivalent. Certainly all of alphabetic and
 * decimal digit characters represent themselves, but as you'll see, special characters
 * such as $ and the period (.) represent either matches to something other than themselves,
 * or operators that qualify the preceding term. In fact, you've already seen how the [, ], -,
 * and ^ characters  are used to reoresent something other than their literal selves.
 * */
/**
 * How do we specify that we want to match a literal [ or $ or ^ or other special character?
 * Within a regex, the backslash character escapes whatever character follows it, making it
 * a literal match term. So \[ specifies a literal match to the [ character, rather than the
 * opening of a character class expression. A double backslash (\\) matches a single backslash.
 */
// --------------------------------------------------------------------------------------------------
/** BEGINS AND ENDS */
/**
 * Frequently, we may want to ensure that a pattern matches at the beginning of a string,
 * or perhaps at the end of a string.
 *
 * The caret character, when used as the first character of the regex, anchors the match
 * at the beginning of the string, such that /^test/ matches only if the substring test
 * appears at the beginning at the string being matched. (Note that this is an overload
 * of the caret character, because it's also used to negate a character class set.)
 *
 * Similarly, the dollar sign ($) signifies that the pattern must appear at the end of
 * the string:
 * 
          /test$/
 * 
 * Using both ^ and $ indicates that the specified pattern must encompass the entire
 * candidate string:
 * 
          /^test$/
 * 
 */
// --------------------------------------------------------------------------------------------------
/** REPEATED OCCURENCES */
/**
 * If we want a series of four a character, we might express that with /aaaa/,
 * but what if we want to match any number of the same character? Regular expressions
 * enable us to specify several repetition options:
 *
 *   _ To specify that a character is optional (it can appear either once or not at all),
 *     follow it with ?. For example, /t?est/ matches both test and est.
 *
 *   _ To specify that a character should be appear one or many times, use +, as in
 *     /t+est/, which matches test, ttest, tttest, but not est.
 *
 *   _ To specify that the character appears zero, one , or many times, use *, as in
 *     /t*est/ which matches test, ttest, tttest, and est.
 *
 *   _ To specify a fixed number of repetitions, indicate the number of allowed repetitions
 *     between braces. For example, /a{4}/ indicates a match on four consecutive acharacters.
 *
 *   _ To specify a range for the repetition count, indicate the range with a comma separator.
 *     For example, /a{4,10}/ matches any string of 4 through 10 consecutive a characters.
 *
 *   _ To specify an open-ended range, omit the second value in the range ( but leave the comma).
 *     The regex /{4,}/ matches any string of four or more consecutive a characters.
 */
/**
 * Any of these repetition operators can be greedy or nongreedy. By default, they're greedy:
 * The will consume all the possible characters that make up a match. Annotating the operator
 * with a ? character (an overload of the ? operator), as in a+?, makes the operation nongreedy:
 * It will consume only enough characters to make a match.
 *
 * For example, if we're matching against the string aaa, the regular expression /a+/ would match
 * all three characters, whereas the nongreedy expression /a+?/ would match only one a character,
 * because a single a character is all that's needed to satify the a+ term.
 */
// --------------------------------------------------------------------------------------------------
/** PREDEFINED CHARACTER CLASSES */
/**
 * Some characters that we want to match are impossible to specify with literal characters (for example,
 * control character such as a carriage return). In addition, often we might want to match
 * character classes, such as a set of decimal digits, or a set of whitespace characters.
 *
 * The regular expression syntax provides predefined terms that repesent these characters or
 * commonly used classes so that we can use control-character matching in our regular expressions
 * and don't need to resort to the character class operator for commonly used sets of characters.
 */
/**
 * Table 10.1 lists these terms and the character or set they represent. These predefined sets help
 * keep our regular expressions from looking excessively cryptic.
 */
/** Table 10.1 - Predefined character classes and character terms */
/**
     Predefined term                    |         Matches     
                                        |
\t                                      |   Horizontal tab                                                  
\b                                      |   Backspace                                                 
\v                                      |   Vertical tab                                                  
\f                                      |   Form feed                                                  
\r                                      |   Carriage return                                                 
\n                                      |   New line                                                 
\cA : \cZ                               |   Control characters                                                 
\u0000 : \uFFFF                         |   Unicode hexadecimal                                                 
\x00 : \xFF                             |   ASCII hexadecimal                                                  
.                                       |   Any character, except for white space (\s)                                                  
\d                                      |   Any decimal digit; equivalent to [0-9]                                                 
\D                                      |   Any character but a deimal digit; equivalent to [^0-9]                                                  
\w                                      |   Any alphanumeric character including underscore; equivalent to [A-Za-z0-9_]                                                 
\W                                      |   Any charater but alphanumeric and unnderscore; equivalent to [^A-Za-z0-9_]                                                
\s                                      |   Any white space character (space, tab, form feed, and so on)                                                  
\S                                      |   Any character but a whte space character                                                  
\b                                      |   A word boundary                                                
\B                                      |   Not a word boundary (inside a word)
-----------------------------------------------------------------------------------------------------------------------------
 */
// --------------------------------------------------------------------------------------------------

/** GROUPING */

/**
 * So far, you've seen that operators (such as + and *) affect only the preceding term. If
 * we want to apply the operator to a group of terms, we can use parentheses for groups,
 * just as in a mathematical expression. For example, /(ab)+/ matches one or more consecutive
 * occurences of the substring ab.
 *
 * When a part of regex is grouped with parentheses, it serves double duty, also creating
 * what's known as a captures. There's a lot to captures, and we discuss them in more depth
 * in section 10.4.
 */
// --------------------------------------------------------------------------------------------------

/** ALTERNATION (OR) */

/**
 * Alternatives can be expressed using the pipe (|) character.
 * For example, /a|b/ matches either a or b character, and /(ab)+|(cd)+/ matches one or more
 * occurences of either ab or cd.
 */
// --------------------------------------------------------------------------------------------------

/** BACKREFERENCES */

/**
 * The most complex terms we can express in regular expression are backreferences to captures
 * defined in the regex. We address captures at length in section 10.4, but for now just think
 * of them as the portions of a candidate string that are successfully matched against terms
 * in the regular expression. The notation for such a tern is the backslash followed by the
 * number of the capture to be referenced, beginning with 1, such as \1, \2, and so on.
 *
 * An example is /^([dtn])a\1/, which matches a string that starts with any of the d, t, or n
 * characters, followed by an a, followed by whatever character matches the first capture.
 * This latter poitn is important! This isn't same as /[dtn]a[dtn]/. The character following
 * the a can't be any of d, or t, or n, but must be whichever one of those triggers the match
 * for the first character. As such, which character the \1 will match can be known until
 * evaluation time.
 */

/** 
 * A good example of where this might be useful is in matching XML-type markup elements.
 * Consider the following regex:
 * 
          /<(\w+)>(.+)<\/\1>/
 * 
 * This allows us to match simple elements such as <strong>whatever</strong>. Without 
 * the ability to specify a backreference, this wouldn't be possible, because we'd have
 * no way to know what closing tag would match the opening tag ahead of time.     
 */

/**
 * Now that you have a handle on regular expressions, you're ready to look at how to use
 * wisely in your code.
 */
