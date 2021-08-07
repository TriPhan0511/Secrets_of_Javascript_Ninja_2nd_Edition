import * as ninjaModule from './Ninja.js';

assert(ninjaModule.message === 'Hello', 'We can acces the imprted variable.');
assert(
  ninjaModule.sayHiToNinja() === 'Hello Yoshi',
  'We can say hi to Yoshi from outside the module.'
);
assert(typeof ninja === 'undefined', 'But we cannot access Yoshi directly.');
