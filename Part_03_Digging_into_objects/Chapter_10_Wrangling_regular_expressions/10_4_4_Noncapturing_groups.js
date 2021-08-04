/** 10.4.4 - Noncapturing group */

/**
 * As we noted, parentheses serve a double duty: They not only group terms for operations,
 * but also specify captures. This usually isn't issue, but in regular expressions in which
 * lots of grouping is going on, it could cause lots of needless capturing, which may make
 * sorting through the resulting captures tedious.
 *
 * Condider the following regex:
 */

// const pattern = /((ninja-)+)sword/;

/**
 * Here, the intent is to create a regex that allows the prefix ninja- to appear one or
 * more times before the word sword, and we want to capture the entire prefix. This regex
 * requires two sets of parentheses:
 *
 *    _ The parentheses that define the capture (every thing before the string sword).
 *    _ The parenthese that group the text ninja- for the + operator.
 *
 */

/**
 * This all works fine, but it results in more than the single intended capture because of
 * the inner set of grouping parenthese.
 */

/**
 * To indicate that a set of parentheses shouldn't result in a capture, the regular expression
 * syntax lets us put the notation ?: immediately after the opening parenthesis. This is known
 * as a passive subexpression.
 */

/** 
 * Changing this regular expression to:
 * 
      const pattern = /((?:ninja-)+)sword/;
 * 
 * causes only outer set of parentheses to create a capture. The inner parantheses have been
 * converted to a passive subexpression.
 * 
 * To test this, take a look at the following code:     
 */

/** Listing 10.8 - Grouping without capturing */

// Uses a passive subexpression
const pattern = /((?:ninja-)+)sword/;

// Tests
const ninjas = 'ninja-ninja-sword'.match(pattern);
assert(ninjas.length === 2, 'Only once capture was returned.');
assert(ninjas[1] === 'ninja-ninja-', 'Matched both words, without any extra capture.');

/**
 * Running these tests, we can see that the passive subexpression /((?:ninja-)+)sword/
 * prevent unnecessary captures.
 */

/**
 * Wherever posible in our regular expressions, we should trive to use noncapturing (passive)
 * groups in place of capturing when the capture is unnecessary, so that the expresion engine
 * will have much less work to do in remembering and returning the captures. If we don't need
 * captured results, there's no need to ask for them! The price that we pay is that
 * already-complex regular expressions can become a tad more cryptic.
 */

/**
 * Now let's turn pur attention to another way that regular expressions give us ninja
 * powers: using functions with the String object's replace method.
 */
