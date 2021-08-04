/** Using the String object's match method to get captures of a local regular expression */

// // Defines a target string
// const html = '<div class="test"><b>Hello</b> <i>world!</i></div>';

// // A local regular express (default: withou g flag at the end)
// const tag = /<(\/?)(\w+)([^>]*)>/;

// // Using the String object's match method
// // With a local regular expression: the returned result includes the match and the captures
// const result = html.match(tag);

// // Tests
// assert(result[0] === '<div class="test">', 'The returned match.');
// assert(result[1] === '', 'First capture.');
// assert(result[2] === 'div', 'Second capture');
// assert(result[3] === ' class="test"', 'Third capture');
// --------------------------------------------------------------------------------------------------------

/** Using the regular expression's exec method */

// Defines a target string
const html = '<div class="myClass"><p><b>Hello</b> <i>world!</i></p></div>';

// Defines a global regular expression
const tags = /<(\/?)(\w+)([^>]*?)>/g;

let result;
// Repeat the regular expression's exec method
while ((result = tags.exec(html))) {
  // assert(result.length === 4, 'There are one returned match and three captures.');
  if (result[0] === '<div class="myClass">') {
    assert(result[1] === '', 'Empty string');
    assert(result[2] === 'div', 'Opening div tag.');
    assert(result[3] === ' class="myClass"', 'The class name.')
  }
}
