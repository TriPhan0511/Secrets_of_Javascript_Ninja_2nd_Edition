// Uses the import keyword to import an identifier binding from a module
import { message, sayHiToNinja } from './Ninja.js';

// We can now access the imported variable and call the imported function.
assert(message === 'Hello', 'We can access the imported variable.');
assert(sayHiToNinja() === 'Hello Yoshi', 'We can say hi to Yoshi from outside the module.');

// We can't access not-exported module variables directly.
assert(typeof ninja === 'undefined', 'But we can not access Yoshi directly.');
