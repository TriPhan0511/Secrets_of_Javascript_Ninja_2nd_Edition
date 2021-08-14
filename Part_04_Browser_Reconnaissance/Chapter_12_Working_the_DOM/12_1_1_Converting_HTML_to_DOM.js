/** 12.1.1 - Converting HTML to DOM */

/**
 * Converting an HTML string to a DOM structure doesn't involve a whole lot of magic.
 * In fact, it uses a tool that you're most likely already familiar with:
 * the innerHTML property of DOM elements.
 *
 * Using it is a multistep process:
 *
 *  1.  Make sure that the HTML string contains valid HTML code.
 *  2.  Wrap a string in any enclosing markup that's required by browser rules.
 *  3.  Insert the HTML string, using innerHTML, into a dummy DOM element.
 *  4.  Extract the DOM nodes back out.
 *
 * The steps aren't overly complex, but the actual insertion has some gotchas that we'll
 * need to take into account. Let's take a look at each step in detail.
 */
// ---------------------------------------------------------------------------------------------------------

/** PREPROCESSING THE HTML SOURCE STRING */

/**
 * To start, we'll need to clean up the source HTML to meet our needs. For example, let's
 * take a look at a skeleton HTML that allow us to choose a ninja (through the option element)
 * and that shows the details within a table, details that are intended to be added at a 
 * later point:
 * 
    <option>Yoshi</option>
    <option>Kuma</option>
    <table/>
 * 
 * This HTML string has two problems. First, the option elements shouldn't stand on their own.
 * If you follow proper HTML semantics, they should be contained within a select element.
 * Second, even though markup language usually allows to self-close childless elements, such
 * as <table/>, in HTML the seld-closing works for only small subset of elements (table 
 * not being one of them). Attempting to sue that syntax in other cases is likely to cause 
 * problems in some browsers.
 * 
 * Let's start with solving the problem of self-closing elements. To support this feature, we
 * can do a quick prepare on the HTML string to convert elements such as <table/> to
 * <table></table> (which will be handled uniformly in all browsers), as shown in the following 
 * listing.
 */

/** Listing 12.1 - Make sure that self-closing elements are interpreted correctly */

// // Uses a reular expression to match the tag name of
// // any elements we don't need to be concerned about
// const tags =
//   /^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

// // A function that uses regular expression to convert self-closing tags to "normal" form
// function convert(html) {
//   return html.replace(/(<(\w+)[^>]*?)\/>/g, (all, front, tag) => {
//     return tags.test(tag) ? all : `${front}></${tag}>`;
//   });
// }

// // Example 1:
// // <img/>
// // (<(img))/>
// // -> all = <img/>
// // -> front = <img
// // -> tag = img

// // Example2:
// // <table/>
// // -> (<(table)/)>
// // -> all = <table/>
// // -> front =  <table
// // -> tag = table

// assert(convert('<a/>') === '<a></a>', 'Check anchor conversion.');
// assert(convert('<hr/>') === '<hr/>', 'Check hr conversion.');
// -------------------------------------------------------------------------------

/** DIY */

// function convert(html) {
//   const selfclosingTags =
//     /^(area|base|br|col|command|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
//   return html.replace(/(<(\w+)[^>]*?)\/>/g, (all, front, tag) => {
//     return selfclosingTags.test(tag) ? all : `${front}></${tag}>`;
//   });
// }

/**
 * When we apply the convert function to this example HTML string, we end up with the
 * following HTML string:
 * 
 * 
    <option>Yoshi</option>
    <option>Kuma</option>
    <table></table> // <-- <table/> expanded
 * 
 * With that accomplished, we still have to solve the problem that our option elements
 * aren't contained within a select element. Let's see how to determine whether an element
 * needs to be wrapped.
 */
// ---------------------------------------------------------------------------------------------------------

/** HTML WRAPPING */

/**
 * According to the semantics of HTML, some HTML elements must be within certain
 * container elements before they can be injected. For example, an <option> element
 * must be contained within a <select> element.
 *
 * We can solve this problem in two ways, both of which require constructing a mapping
 * between problematic elements and their containers:
 *
 *  _ The string could be injected directly into a specific parent by using innerHTML,
 *    where the parent has been previously constructed using the built-in
 *    document.createElement. Although this may work in some cases and in some browsers,
 *    it isn't universally guaranteed.
 *
 *  _ The string could be wrapped with the appropriate required markup and then injected
 *    directly into any container element (such as a <div>). This is more foolproof,
 *    but it's also more work.
 *
 * The second technique is preferred; it involves little browser-specific code, in contrast
 * to the first approach, which requires a fair amount of mostly browser-specific code.
 */

/**
 * The set of problematic elements that need to be wrapped in specific container element
 * is fortunately a rather manageable seven. In table 12.1, the ellipses (...) indicates
 * the locations where the elements need to be injected.
 */

/** Table 12.1 - Elements that need to be contained within other elements */

/**
    Element name                      |       Ancestor element
                                      |
<option>, <optgroup>                  |   <select multiple>...</select>
                                      |
<legend>                              |   <fieldset>...</fieldset>   
                                      |
<thead>, <tbody>, <tfoot>,            |   <table>...</table>
<colgroup>, <caption>                 |
                                      |
<tr>                                  |    <table><thead>...</thead></table>,
                                      |    <table><tbody>...</tbody></table> 
                                      |    <table><tfoot>...</tfoot></table> 
                                      |
<td>, <th>                            |    <table><tbody><tr>...</tr></tbody></table>   
                                      |
<col>                                 |    <table>
                                      |     <tbody></tbody> 
                                      |     <colgroup>...</colgroup> 
                                      |    </table>
                                      |
 */

/**
 * Nearly all of these are straightforward, save for the following points, which require a
 * bit of explanation:
 *
 *    _  A <select> element with multiple attribute is used (as opposed to a non-multiple select)
 *       because it won't automatically check any of the options that are placed inside it (whereas
 *       a single select will autocheck the first option).
 *
 *    _  The <col> fix includes an extra <tbody>, without which the <colgroup> won't be
 *       generated properly.
 */

/**
 * With the elements properly mapped to their wrapping requirement, let's start generating.
 */

/**
 * With the information from table 12.1, we can generate the HTML that we need to insert into
 * a DOM element,as shown in the following listing.
 */

/** Listing 12.2 - Creating a list of DOM nodes from some markup */

function getNodes(htmlString, doc) {
  // Map of element types that need special parent containers.
  // Each entry has the depth of new node, opening HTML for the parents,
  // and closing HTML for the parents
  const map = {
    '<td': [3, '<table><tbody><tr>', '</tr></tbody></table>'],
    '<th': [3, '<table><tbody><tr>', '</tr></tbody></table>'],
    '<tr': [2, '<table><thead>', '</thead></table>'],
    '<option': [1, '<select multiple>', '</select>'],
    '<optgroup': [1, '<select multiple>', '</select>'],
    '<legend': [1, '<fieldset>', '</fieldset>'],
    '<thead': [1, '<table>', '</table>'],
    '<tbody': [1, '<table>', '</table>'],
    '<tfoot': [1, '<table>', '</table>'],
    '<colgroup': [1, '<table>', '</table>'],
    '<caption': [1, '<table>', '</table>'],
    '<col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  };

  // Matches the opening bracket and tag name
  const tagName = htmlString.match(/<\w+/);
  // If it's in the map, grabs the entry; otherwise,
  // constructs a faux entry with empty "parent" markup and a depth of zero.
  let mapEntry = tagName ? map[tagName[0]] : null;
  if (!mapEntry) {
    mapEntry = [0, '', ''];
  }

  // Creates a <div> element in which to create the new nodes.
  // Note that we use a passed document if it exists, or default to the current document if not.
  let div = (doc || document).createElement('div');

  // Wraps the incoming markup with the parents from the map entry,
  // and injects it as the inner HTML of the newly created ,div>
  div.innerHTML = `${mapEntry[1]}${htmlString}${mapEntry[2]}`;

  // Walks down the just-created tree to the depth indicated by the map entry.
  // This should be the parent of the desired node created from the markup.
  while (mapEntry[0]--) {
    div = div.lastChild;
  }

  // Returns the newly created element
  return div.childNodes;
}

// Tests
assert(
  getNodes('<td>test</td><td>test2</test>').length === 2,
  'Get two nodes back from the method.'
);
assert(getNodes('<td>test</td>')[0].nodeName === 'TD', "Verify that we're getting the right node.");
// ----------------------------------------------------------------------
// console.log(getNodes('<td>test</td><td>test2</test>'));

// '<td>test</td><td>test2</td>

// -> tagName = ['<td', ...]
// -> mapEntry = [3, '<table><tbody><tr>', '</tr></tbody></table>']

// -> div
// -> div.innerHTML = '<table><tbody><tr><td>test</td><td>test2</test></tr></tbody></table>'
/**
<div>
   <table>
      <tbody>
         <tr>
            <td>test</td>
            <td>test2</td>
         </tr>
      </tbody>
   </table>
</div>
 */
//-----------------------------------------------------------------------------------------------------------------------

/**
 * We create a map of all element types that need to be placed within special parent containers,
 * a map that contains the depth of the node, as well as the enclosing HTML.
 * Next, we use a regular expression to match the opening bracket and the tag name of the
 * element we want to insert:
 * 
      const tagName = htmlString.match(/<\w+/);
 * 
 * The we select a map entry, and in case there isn't one, we create a dummy entry with
 * an empty parent element markup:
 * 
      let mapEntry = tagName ? map[tagName[0]] : null;
      if (!mapEntry) {
         mapEntry = [0, '', ''];
      }
 * 
 * We follow this by creating a new div element, surrounding it with the mapped HTML,
 * and inserting the newly created HTML into the previously created div element:
 * 
      let div = (doc || document).createElement('div');
      div.innerHTML = `${mapEntry[1]}${htmlString}${mapEntry[2]}`;
 * 
 * 
 * Finally, we find the parent of the desired node created from our HTML string, and we
 * return the newly created node:
 * 
      while (mapEntry[0]--) {
         div = div.lastChild;
      }
      return div.childNodes;
 * 
 */

/**
 * After all of this, we have set of DOM nodes that we can begin to insert into the document.
 */

/**
 * If we go back to our motivating example, and apply the getNodes function, we'll 
 * end up with something along the following lines:
 * 
      <select mutiple>
         <option>Yoshi</option>
         <option>Kuma</option>
      </select>
      <table></table>
 * 
 * 
 * 
 */
