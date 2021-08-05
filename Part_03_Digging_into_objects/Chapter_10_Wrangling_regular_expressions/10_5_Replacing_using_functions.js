/** 10.5 - Replacing using functions */

/**
 * The replace method of the String object is a powerful and versatile method, which we saw
 * used briefly in our discussion of captures. When a regular expression is provided as
 * the first parameter to replace, it will cause a replacement on a match (or matches if
 * the regex is global) to the pattern rather than on a fixed string.
 *
 * For example, let's say we want to replace all uppercase characters in a string with X.
 * We could write the following:
 * 
        'ABCDEfg'.replace(/[A-Z]/g, 'X')
 * 
 * This result in a value of XXXXXfg. Nice.
 */

/**
 * But perhaps the most powerful feature presented by replace is the ability to provide
 * a function as the replacement rather than a fixed string.
 *
 * When the replacement value (the second argument) is a function, it's invoked for each
 * match found (remember that a global search will match all instances of the pattern in
 * the source string) with a variable list of parameters:
 *
 *  _ The full text of the match.
 *
 *  _ The capture of the match, one parameter for each.
 *
 *  _ The index of the match within the original string.
 *
 *  _ The source string.
 *
 * The value returned from the function serves as the replacement value.
 */

/**
 * This provides a tremendous amount of leeway to determine what the replacement string
 * should be at runtime, with lots of information regarding the nature of the match at
 * our fingertips.
 *
 * For example, in the following listing, we use the function to provide a dynamic
 * replacement value for converting a string with words separted by dashes to its
 * camel-cased equipvalent.
 */

/** Listing 10.9 - Converting a dashed string to camel case */

// function upper(all, letter) {
//   return letter.toUpperCase();
// }

// assert(
//   'border-bottom-width'.replace(/-(\w)/g, upper) === 'borderBottomWidth',
//   'Camel case a hyphenated string.'
// );

/**
 * Here, we provide a regex that matches any character preceded by a dash character. A capture
 * in the global regex identifies the character that was matched (without the dash). Each time
 * the function is called (twice in this example), it's passed the full match string as the
 * first argument, and the capture (only one for this regex) as the second argument. We aren't
 * interested in the rest of the arguments, so we didn't specify them.
 *
 * The first time the function is called, it's passed -b and b; and the second time it's called,
 * it's passed -w and w. In each case, the captured letter is uppercased and returned as the
 * replacement string. We end up with -b replaced by B and with -w replaced by W.
 */

/**
 * Because a global regex will cause such a replace function to be executed for every match
 * in a source string, this technique can even be extended beyond doing rote replacements.
 * We can use the technique as a means of string traversal, instead of doing
 * the exec()-in-a-while-loop technique as we saw earlier in this chapter.
 */

// const html = '<b class="test">Hello,</b> <i>world!</i>';
// const pattern = /<(\w+)([^>]*)>(.+)<(\/\1)>/g;

// let match = pattern.exec(html);
// console.log(match);
// assert(match.length === 5, 'One returned match and four captures.');
// assert(match[0] === '<b class="test">Hello,</b>', 'Entire tag.');
// assert(match[1] === 'b', 'The opening b tag.');
// assert(match[2] === ' class="test"', 'The attributes.');
// assert(match[3] === 'Hello,', 'The content of b tag.');
// assert(match[4] === '/b', 'The closing b tag.');

// match = pattern.exec(html);
// assert(match[0] === '<i>world!</i>', 'The entire.');
// assert(match[1] === 'i', 'The opening i tag.');
// assert(match[2] === '', 'No attribute');
// assert(match[3] === 'world!', 'The content of i tag.');
// assert(match[4] === '/i', 'The closing i tag.');

/**
 * For example, let's say that we're looking to take a query string and convert it into an
 * alternative format for suits our purposes. We'd turn a query string such as
 * 
      foo=1&foo=2&blah=a&blah=b&foo=3
 *
 * into one that looks like this:
 * 
      foo=1,2,3&blah=a,b
 *      
 * A solution using regular expressions and replace could result in some especially terse
 * code, as shown in the next listing.
 */

/** Listing 10.10 -A technique for compressing a query string */

function compress(source) {
  // Stores located keys
  const keys = {};

  // Uses the replace method as a means of traversing a string for values
  source.replace(/([^=&]+)=([^&]*)/g, function (full, key, value) {
    // Extracts key-value info
    keys[key] = (keys[key] ? `${keys[key]},` : '') + value;
    return '';
  });

  // Collects key info
  const results = [];
  for (let key in keys) {
    results.push(`${key}=${keys[key]}`);
  }

  // Joins results with &
  return results.join('&');
}

// Tests
assert(compress('foo=1&foo=2&blah=a&blah=b&foo=3') === 'foo=1,2,3&blah=a,b', 'Compression is OK!');
// --------------------------------------------------------------------------------------------------------

/**
 * The most interesting aspect of this example is its use of the string replace method as
 * a means of traversing a string for values, rather than as a search-and-replace mechanism.
 * The trick is twofold: passing in a function as the replacement value argument, and
 * instead of returning a value, using it as a means of searching.
 */

/**
 * The example code first declares a hash keys in which we store the keys and values that
 * we find in the source query string. Then we call the rplace method on the source string,
 * passing a regex that will match the key-value pairs, and capture the key and the value.
 * We also pass a function that will be passed the full match, the key capture, and the
 * value capture. These captured values get stored in the hash for later reference. Note
 * that we return the empty string because we don't care what subtitutions happens to the
 * source string - we're just using the side effects rather than the result.
 */

/**
 * After replace returns, we delcared an array in which we'll aggregate the results and 
 * iterate through the keys that we found, adding each to the array. Finally, we join
 * each of the results we stored in the array by adding & as the delimiter, and we return
 * the result:
 * 
          const results = [];
          for (let key in keys) {
          results.push(`${key}=${keys[key]}`);
          }
          return results.join('&');
 * 
 */

/**
 * Using this technique, we can co-opt the String object's replace method as our own
 * string-searching mechanism. The result isn't only fast, but also simple and effective.
 * The level of power that this technique provides, especially in light of the small
 * amount of code necessary, shouldn't be underestimated.
 */

/** VERSION: Uses the exec method */
// function compress2(source) {
//   const pattern = /([^=&]+)=([^&]*)/g;
//   const keys = {};
//   let match;
//   while ((match = pattern.exec(source)) !== null) {
//     const key = match[1];
//     const value = match[2];
//     keys[key] = (keys[key] ? `${keys[key]},` : '') + value;
//   }

//   const results = [];
//   for (let key in keys) {
//     results.push(`${key}=${keys[key]}`);
//   }
//   return results.join('&');

//   //   Tests
//   console.log(keys);
// }

// // Tests
// assert(compress2('foo=1&foo=2&blah=a&blah=b&foo=3') === 'foo=1,2,3&blah=a,b', 'Compression is OK!');
// --------------------------------------------------------------------------------------------------------

/**
 * All of these regular expression techniques can have a huge impact on how we write script on our pages.
 * Let's see how to apply what you've learned to solve common problems we might encounter.
 */
