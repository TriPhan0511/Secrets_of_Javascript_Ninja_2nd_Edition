// Uses the as keyword to alias imports,
// thereby avoiding names clashes.
import { greet as sayHello } from './Hello.js';
import { greet as saySalute } from './Salute.js';

// We can't access the original function name
assert(typeof greet === 'undefined', 'We cannot access greet.');

// But we can access the aliases
assert(
  typeof sayHello === 'function' && typeof saySalute === 'function',
  'We can access the aliased identifiers!'
);
