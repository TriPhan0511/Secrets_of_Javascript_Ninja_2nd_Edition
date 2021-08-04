/** 10.4.3 - Referencing captures */

/**
 * We can refer to portions of a match that we've captured in two ways: one within the match itself,
 * and one within a replacement string (where applicable). For example, let's revisit the match in
 * listing 10.6 (in which we match an opening or closing HTML tag) and modify it in the following
 * listing to also match the inner content of the tag itself.
 */

/** Listing 10.7 - Using backreferencens to match the content of an HTML tag */

// const html = '<b class="hello">Hello</b> <i>world!</i>';
// const pattern = /<(\w+)([^>]*)>(.*?)<\/\1>/g; // Uses capture backreference

// // Runs the pattern on the test string
// let match = pattern.exec(html);

// // Tests various captures that are captured by the defined pattern
// assert(match[0] === '<b class="hello">Hello</b>', 'The entire tag, start to finish.');
// assert(match[1] === 'b', 'The tag name.');
// assert(match[2] === ' class="hello"', 'The tag attributes');
// assert(match[3] === 'Hello', 'The contents of the tag.');

// match = pattern.exec(html);
// assert(match[0] === '<i>world!</i>', 'The entire tag, start to finish,');
// assert(match[1] === 'i', 'The tag name.');
// assert(match[2] === '', 'The tag attributes');
// assert(match[3] === 'world!', 'The contents of the tag.');

/**
 * We use \1 to refer to the first capture within the expression, which in this case is the
 * name of the tag. Using this information, we can match the appropriate closing tag,
 * referring to whatever the captured match. (This all assumes, of course, that there aren't
 * any embedded tags of the same name within the current tag, so this is hardly an exhaustive
 * example of tag matching.)
 */

/**
 * Additionally, we can get capture references within the replace string of a call to
 * the replace method. Instead of using backreference codes, as in listing 10.7, we use
 * the syntax of $1, $2, $3, up through each capture number. Here's an example:
 */

assert(
  'fontFamily'.replace(/([A-Z])/g, '-$1').toLowerCase() === 'font-family',
  'Convert the camelCase into dashed notation.'
);

/**
 * In this code, the value of the first capture (in this case, the capital letter F) is
 * referenced in the replace string (via $1). This allows us to specify a replace string
 * without even knowing what its value until matching time.
 */

/**
 * The ability to reference regular-expression captures helps make a lot of code that
 * would otherwise be difficult, quite easy. The expressive nature that it provides ends up
 * allowing for some terse statement that could otherwise be rather obtuse, convoluted,
 * and lengthy.
 */

/**
 * Because both captures and expression grouping are specified using parentheses,
 * there's no way for regular-expression processor to know which sets of parentheses
 * we added to the regex for grouping and which were intended to indicate captures.
 * It treats all sets of parentheses as both groups and captures, which can result
 * in the capture of more information than we really intended, because we needed to
 * specify some grouping in the regex. What can we do in such case?
 */