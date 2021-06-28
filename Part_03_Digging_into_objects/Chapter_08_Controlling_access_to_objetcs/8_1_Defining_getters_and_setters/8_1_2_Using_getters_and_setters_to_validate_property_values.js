/**
 * 8.1.1 - Using getters and setters to validate property values
 */

/**
 * As we've established so far, a setter is a method that's executed whenever we write a value to the
 * matching property. We can take advantage of setters to perform an action whenever code attempts to
 * update the value of a property. For example, one of the things we can do is validate the passed-in
 * value. Take a look at the following code, which endures that our skillLevel property can be assigned
 * only intger values.
 */

/**
 * Listing 8.5 - Validating property value assigments with setters
 */

function Ninja() {
  let _skillLevel = 0;

  Object.defineProperty(this, 'skillLevel', {
    get: () => _skillLevel,
    set: (value) => {
      // Checks whether the passed-in value is an integer.
      // If it isn't, an exception is thrown.
      if (!Number.isInteger(value)) {
        throw new TypeError('Skill level should be a number');
      }
      _skillLevel = value;
    },
  });
}

// Tests
const ninja = new Ninja();

// We can assign an integer value to the property
ninja.skillLevel = 10;
assert(ninja.skillLevel === 10, 'The value was updated.');

// Trying to assign a noninteger value (in this case, a string)
// results in an exception thrown from the setter method.
try {
  ninja.skillLevel = 'Great';
  // fail('Should not be here');
  console.log('Should not be here');
} catch (e) {
  pass('Setting a non-integer value throws an exception.');
}

/**
 * This example is a straightforward extension to listing 8.4. The only major difference is that now,
 * whenever a new value assigned to the skillProperty, we check whether the passed-in value is an integer.
 * If it isn't, an exception is thrown, and the private _skillLevel variable won't be modified. 
 * If everything went okay and an integer value is received, we end up with a new value of the private
 * _skillLevel varibale:
 * 
     set: (value) => {
        if (!Number.isInteger(value)) {
          throw new TypeError('Skill level should be a number');
        }
        _skillLevel = value;
      },
 */

/**
 * This is how you avoid all these silly little bugs that happen when a value of the wrong type ends up
 * in a certain property
 */