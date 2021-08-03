/** EXACT MATCHING */

// assert(/test/.test('test'), 'Pass');
// assert(/test/.test('hello test aloha'), 'Pass');
// assert(/test/.test('est'), 'Fail');
// ------------------------------------------------------------------------

/** MATCHING FROM A CLASS OF CHARACTERS */

// assert(/[abc]/.test('abc'), 'Pass');
// assert(/[abc]/.test('hello a'), 'Pass');
// assert(/[abc]/.test('b hello'), 'Pass');
// assert(/[abc]/.test('c hello'), 'Pass');
// assert(/[abc]/.test('hello'), 'Fail');
// ------------------------------------------------------------------------

// assert(/[^abc]/.test('abc'), 'Fail');
// assert(/[^abc]/.test('abch'), 'Pass');
// assert(/[^abc]/.test('abc '), 'Pass');
// ------------------------------------------------------------------------

// assert(/[c-f]/.test('cdef'), 'Pass');
// assert(/[c-f]/.test('c'), 'Pass');
// assert(/[c-f]/.test('d aloha'), 'Pass');
// assert(/[c-f]/.test('e aloha'), 'Pass');
// assert(/[c-f]/.test('aloha f'), 'Pass');
// assert(/[c-f]/.test('g'), 'Fail');
// ------------------------------------------------------------------------

// assert(/[^c-f]/.test('cdef'), 'Fail');
// assert(/[^c-f]/.test('hello'), 'Pass')
// ------------------------------------------------------------------------

/** ESCAPING: Backslash (\) */
// assert(/<(\w+)>.+<\/\1>/.test('<strong>whatever</strong>'), 'Pass');
// ------------------------------------------------------------------------

/** BEGINS AND ENDS: (^ and $) */

// assert(/^my name/.test('my name is David.'), 'Pass');
// assert(/^my name/.test('his name is David.'), 'Fail');
// assert(/^my name/.test('myname is David.'), 'Fail');

// assert(/my name/i.test('My name is Kelly.'), 'Pass');
// ------------------------------------------------------------------------

// assert(/city$/.test('city'), 'Pass');
// assert(/city$/.test('Danang city'), 'Pass');
// assert(/city$/.test('Danang ity'), 'Fail');
// assert(/city$/.test('Danang y'), 'Fail');
// ------------------------------------------------------------------------

// assert(/^H\w+\scity$/.test('Hanoi city'), 'Pass');
// assert(/^H\w+\scity$/.test('Hue city'), 'Pass');
// assert(/^H\w+\scity$/.test('Danang city'), 'Fail');
// assert(/^H\w+\scity$/.test('HoaVang district'), 'Fail');
// ------------------------------------------------------------------------

/** REPEATE OCCURENCES */

/** ?: optional (can appear either once o not at all) */

// assert(/neighbou?r/.test('neighbour'), 'Pass');
// assert(/neighbou?r/.test('neighbor'), 'Pass');
// assert(/neighbou?r/.test('neighbouur'), 'Fail');
// ------------------------------------------------------------------------

/** + : can appear once or many times  */

// assert(/hello+/.test('hello'), 'Pass');
// assert(/hello+/.test('helloooo'), 'Pass');
// assert(/hello+/.test('hell'), 'Fail');
// ------------------------------------------------------------------------

/** *: can appear zero, once, or many times */
// assert(/hello*/.test('hell'), 'Pass');
// assert(/hello*/.test('hello'), 'Pass');
// assert(/hello*/.test('hellooooo'), 'Pass');
// ------------------------------------------------------------------------

/** Fixed number of repetitions: {number} */

// assert(/Kel{2}y/.test('Kelly'), 'Pass');
// assert(/Kel{2}y/.test('Key'), 'Fail');
// assert(/Kel{2}y/.test('Kely'), 'Fail');
// assert(/Kel{2}y/.test('Kellly'), 'Fail');
// ------------------------------------------------------------------------

/** Range: {number1, number2} */

// assert(/aloha{1,4}/.test('aloha'), 'Pass');
// assert(/aloha{1,4}/.test('alohaa'), 'Pass');
// assert(/aloha{1,4}/.test('alohaaa'), 'Pass');
// assert(/aloha{1,4}/.test('alohaaaa'), 'Pass');
// assert(/aloha{1,4}/.test('alohaaaaa'), 'Pass'); // 5 times, because it matches first four "a"
// assert(/aloha{1,4}/.test('aloh'), 'Fail');
// ------------------------------------------------------------------------

/** Open-ended range: {number,} */

// assert(/aloha{2,}/.test('aloh'), 'Fail');
// assert(/aloha{2,}/.test('aloha'), 'Fail');
// assert(/aloha{2,}/.test('alohaa'), 'Pass');
// assert(/aloha{2,}/.test('alohaaaaaaaa'), 'Pass');

/** Greedy and non-greedy */

// // Greedy: by default
// // Non-greedy: annotated by ? character

// // Greedy (by default)
// assert(/aloha{2,4)/.test('alohaaaaaaaaaa')); // 10 times
// // -> Because it's greedy by default so the match is: alohaaaa (4 times)

// // Non-greedy (using ?)
// assert(/aloha{2,4}?/.test('alohaaaaaaaaaa')); // 10 times
// // Because it's annotated non-greedy so the match is: alohaa (2 times)
// ------------------------------------------------------------------------

/** PREDEFINE CHARACTER CLASSES */
// ------------------------------------------------------------------------

/** GROUPING (Using parentheses: ()) */

/**
 * The parenthese serves two duties:
 *  1. Grouping
 *  2. Capturing
 */

// 1. Grouping
// assert(/(ab){2}/.test('abab'), 'Pass');
// assert(/(ab){2}/.test('ab'), 'Fail');
// assert(/(ab){2}/.test('aabb'), 'Fail');
// assert(/(ab){2}/.test('ab ab'), 'Fail');
// ------------------------------------------------------------------------

// // 2. Capturing
// assert(/<(\w+)>.+<\/\1>/.test('<strong>whatver</strong>'), 'Pass');
// // -> We captured the (\w+) -> "strong"
// ------------------------------------------------------------------------

/** ALTERNATION (OR): Use | */

// assert(/a|b/.test('a'), 'Pass');
// assert(/a|b/.test('b'), 'Pass');
// assert(/a|b/.test('c'), 'Fail');

// assert(/(ab)|(cd)/.test('ab'), 'Pass')
// assert(/(ab)|(cd)/.test('cd'), 'Pass')
// assert(/(ab)|(cd)/.test('ad'), 'Fail')
// ------------------------------------------------------------------------

/** BACKREFERENCES */
// The backslash followed by the number of the capture to be referenced, beginning with 1,
// such as \1, \2, and so on.

const string = '<p><strong>whatever</strong></p>';
assert(/<(\w+)><(\w+)>.+<\/\2><\/\1>/.test(string), 'Pass');
// -> \1: captured (p)
// -> \2: captured (strong)
