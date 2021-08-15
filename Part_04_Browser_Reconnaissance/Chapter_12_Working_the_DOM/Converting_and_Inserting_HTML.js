// Defines a function
function convert(html) {
  const selfclosingTags =
    /^(area|base|br|col|command|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
  return html.replace(/(<(\w+)[^>]*?)\/>/g, (all, front, tag) => {
    return selfclosingTags.test(tag) ? all : `${front}></${tag}>`;
  });
}

// Defines a function
function getNodes(htmlString, doc) {
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

  return div.childNodes;
}

// Tests
const string = '<option>Yoshi</option><option>Kuma</option><table/>';
const htmlString = convert(string);
const nodes = getNodes(htmlString);

// console.log(htmlString);

console.log(nodes.length);
// -> 2
console.log(nodes);
// ->NodeList(2) [option, option]

for (const node of nodes) {
  document.body.appendChild(node);
}
