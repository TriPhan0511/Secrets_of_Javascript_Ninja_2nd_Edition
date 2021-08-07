// Defines a function called sayHi
function sayHi() {
  return 'Hello';
}

// Tests taht we can access only the sayHi function,
// but not the alias!
assert(
  typeof sayHi === 'function' && typeof sayHello === 'undefined',
  'Within the module we can access only sayHi.'
);

// Provides an identifier alias with the as keyword
export { sayHi as sayHello };
