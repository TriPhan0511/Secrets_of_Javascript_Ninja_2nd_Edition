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
 */
