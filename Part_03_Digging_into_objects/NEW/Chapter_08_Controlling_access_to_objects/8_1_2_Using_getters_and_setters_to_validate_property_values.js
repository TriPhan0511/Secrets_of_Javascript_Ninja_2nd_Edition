/** 8.1.2 - Using getters and setters to validate property values */

/**
 * As we've established so far, a setter is as method that's executed whenever we write a
 * value to the matching property. We can take advantage of setters to perform an action
 * whenever code attempts to update the value of a property. For example, one of the things
 * we can do is validate the passed-in value.
 *
 * Take a look at the following code, which ensures that our skillLevel property can be
 * assigned only integer values.
 */

/** Listing 8.5 - validating property value assigments with setters */

function Ninja() {
  let _skillLevel;

  Object.defineProperty(this, 'skillLevel', {
    get: () => _skillLevel,
    set: (value) => {
      // Checks whether the passed-in value is an integer. If it isn't, an exception is thrown.
      if (!Number.isInteger(value)) {
        throw new TypeError('Skill level should be a number.');
      }
      _skillLevel = value;
    },
  });
}

const ninja = new Ninja();

// We can assign an integer value to the property.
ninja.skillLevel = 10;
assert(ninja.skillLevel === 10, 'Skill level is 10.');

// Trying to assign a non-integer value (in this case, a string)
// results in an exception thrown from the setter method.
try {
  ninja.skillLevel = 'Great';
  fail('Should not be here.');
} catch (err) {
  pass('Setting a non-integer value throws an exception!');
}

// Checks whether the skillLevel keeps the current value.
assert(ninja.skillLevel === 10, 'Skill level is still 10.');

/**
 * This is how you avoid all those silly little bugs that happen when a value of the wrong type
 * ends up in a certain property. Sure, it adds overhead, but that's a price that we sometimes
 * have to pay to safely use a highly dynamic language such as Javascript.
 */

/**
 * This is just on example of the usefulness of setter methods; there are many more that we won't
 * explicitly explore. For example, you can use the same principle to track value history,
 * perform logging, provide change notification, and more.
 */
