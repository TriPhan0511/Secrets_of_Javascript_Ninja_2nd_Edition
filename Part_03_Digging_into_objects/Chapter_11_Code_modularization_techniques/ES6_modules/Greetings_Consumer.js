// When importing, only the sayHello alias is available
import { sayHello } from './Greetings.js';

assert(
  typeof sayHi === 'undefined' && typeof sayHello === 'function',
  'When importing, we can only access the alias.'
);
