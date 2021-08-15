/** 12.1.2 - Inserting elements into the document */

/**
 * After we have DOM nodes, it's time to insert them into the document. A couple of
 * steps are required, and we'll work through them in this section.
 */

/**
 * Because we have an array of elements that we need to insert - potentially into any
 * number of locations within the document - we want to try keep the number of operations
 * performed to a minimum. We can do this by using DOM fragments. DOM fragments are part
 * of the W3C DOM specification and are supported in all browsers. This useful facility
 * gives us a container to hold a collection of DOM nodes.
 *
 * This in itself is quite useful, but it also has the advantage that the fragment can
 * be injected and cloned in a single operation instead of having to inject and clone
 * each individual node over and over again. This has the potential to dramatically
 * reduce the number of operations required for a page.
 */

/**
 * Before we use this mechanism in our code, let's revisit the getNodes() code of
 * listing 12.2 and adjust a tad to use DOM fragments. The changes are minor and
 * consist of adding a fragment parameter to the function's parameter list, as follows.
 */

/** Listing 12.3 - Expanding the getNodes function with fragments */

function getNodes(htmlString, doc, fragment) {
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
  const tagName = htmlString.match(/<\w+/);
  let mapEntry = tagName ? map[tagName[0]] : null;
  if (!mapEntry) {
    mapEntry = [0, '', ''];
  }
  let div = (doc || document).createElement('div');
  div.innerHTML = `${mapEntry[1]}${htmlString}${mapEntry[2]}`;
  while (mapEntry[0]--) {
    div = div.lastChild;
  }

  // If the fragment exits, injects the nodes into it.
  if (fragment) {
    while (div.firstChild) {
      fragment.appendChild(div.firstChild);
    }
  }

  return div.childNodes;
}

/**
 * In this example, we make a couple of changes. First 
 */