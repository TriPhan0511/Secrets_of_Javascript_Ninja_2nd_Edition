/** 10.4.2 - Maching using global expressions */

/**
 * As we saw in the previous section, using a local regular expression (one without the
 * global flag) with the String object's match method returns an array containing the
 * entire matched string, along with any matched captures in the operation.
 *
 * But when we supply a global regular expression (one with the g flag included),
 * match returns something different. It's still an array of results, but in the case
 * of a global regular expression, which matches all possibilities in the candidate
 * string rather than the first match, the array returned contains the global matches;
 * captures within each match aren't returned in this case.
 *
 * We can see this in action on the following code and tests.
 */

// const string = 'hello and hello';
// const match = string.match(/h(el)lo/g);
// // const match = string.match(/h(el)lo/);

// console.log(match);
// report(match[1]);

/** Listing 10.5 - Differences between global and local searches with match */

// const html = '<div class="test"><b>Hello</b> <i>world!</i></div>';

// // Matches using a local regex
// const results = html.match(/<(\/?)(\w+)([^>]*?)>/);
// assert(results[0] === '<div class="test">', 'The entire match.');
// assert(results[1] === '', 'The (mising) slash.');
// assert(results[2] === 'div', 'The tag name');
// assert(results[3] === ' class="test"', 'The attributes.');

// // Matches using a global regex (put the g flag at the the end of regex)
// const all = html.match(/<(\/?)(\w+)([^>]*?)>/g);
// assert(all[0] === '<div class="test">', 'Opening div tag.');
// assert(all[1] === '<b>', 'Opening b tag.');
// assert(all[2] === '</b>', 'Closing b tag.');
// assert(all[3] === '<i>', 'Opening i tag.');
// assert(all[4] === '</i>', 'Closing i tag.');
// assert(all[5] === '</div>', 'Closing div tag.');

/**
 * We can see that when we do a local match, html.match(/<(\/?)(\w+)([^>]*?)>/), a single
 * instance is matched and the captures within that match are also returned. But when we
 * use a global match, html.match(/<(\/?)(\w+)([^>*?])>/g), what's returned is the list
 * of matches.
 */
// ---------------------------------------------------------------------------------------------------------

/**
 * If captures are important to us, we can regain this functionality while still performing
 * a global search by using the regular expression's exec method. This method can be
 * repeatedly called against a regular expression, causing it to return the next
 * matched set of information every time it's called. A typical pattern for use is shown in
 * the following listing.
 */

/** Listing 10.6 - Using the exec method to do both capturing and global search */

const html = '<div class="test"><b>Hello</b> <i>world!</i></div>';
const tag = /<(\/?)(\w+)([^>]*?)>/g;
let match,
  num = 0;

// Repeatly calls exec
while ((match = tag.exec(html)) !== null) {
  assert(match.length === 4, 'Every match finds each tag and 3 captures.');
  num++;
}
assert(num === 6, '3 opening and 3 closing tags found.');

// We get the differen result for each exec method calling ????
// console.log(tag.exec(html));
// console.log(tag.exec(html));
// // 0: "<div class=\"test\">"
// // 1: ""
// // 2: "div"
// 3: " class=\"test\""

/**
 * In this example, we repeatedly call the exec method:
 *
      while ((match = tag.exec(html)) !== null) {...}
 *
 * This retains state from the previous invocation so that each subsequent call progresses
 * to the next global match. Each call returns the next and its captures.
 */

/**
 * By using either match or exec, we can always find the exact matches (and captures)
 * that we're looking for. But we'll need to dig further if we want to refer to the captures
 * themselves within the regex.
 */
