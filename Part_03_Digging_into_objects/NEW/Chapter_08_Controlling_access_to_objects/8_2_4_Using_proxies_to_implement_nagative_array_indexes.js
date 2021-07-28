/** 8.2.4 - Using proxies to implement negative array indexes */

/**
 * If your programming background is from languages such as Python, Ruby, or Perl,
 * you might be used to negative array indexes, which enable you to use negative
 * indexes to access items from the back, as shown in the following snippet:
 */

/**
      const ninjas = ['Yoshi', 'Kuma', 'Hattori'];

      // Standard access to array items, with positive array indexes
      ninjas[0]; // 'Yoshi'
      ninjas[1]; // 'Kuma'
      ninjas[2]; // 'Hattori'

      // Negative array indexes enables us to access array items from the back,
      // starting with -1, which accesses the last array item.
      ninjas[-1]; // 'Hattori'
      ninjas[-2]; // 'Kuma'
      ninjas[-3]; // 'Yoshi'

 */

/**
 * Now compare the code that we normally use to access the last item in the array,
 * ninjas[ninjas.length-1], with the code that we can use if our language of choice
 * supports negative array indexes, ninjas[-1]. See how much more elegant this is?
 */

/**
 * Unfortunately, Javascript doesn't offer built-in support for negative array indexes,
 * but we can mimic this ability through proxies. To explore this concept, we'll look
 * at a slightly simplified version of code written by Sindre Sorhus, as shown in the
 * foolowing listing.
 */

/** Listing 8.12 - Negative array indexes with proxies */

function createNegativeArrayProxy(array) {
  // If our target object isn't an array, throw an exception.
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array!');
  }

  // Returns a new proxy that takes in the array and uses it as a proxy target
  return new Proxy(array, {
    // The get trap is activated whenever an array index is read.
    get: (target, index) => {
      index = +index; // Turns the property name into a number with a unary plus operator
      // If the read index is a negative number, read from the back of the array, and
      // if it's a positive number, access it normally
      return target[index < 0 ? target.length + index : index];
    },
    // The set trap is activated whenever an array index is written to.
    set: (target, index, val) => {
      index = +index;
      return (target[index < 0 ? target.length + index : index] = val);
    },
  });
}

const ninjas = ['Yoshi', 'Kuma', 'Hattori'];
const proxiedNinjas = createNegativeArrayProxy(ninjas);

assert(
  ninjas[0] === 'Yoshi' && ninjas[1] === 'Kuma' && ninjas[2] === 'Hattori',
  'Array items accessed through positive indexes.'
);

assert(
  proxiedNinjas[0] === 'Yoshi' && proxiedNinjas[1] === 'Kuma' && proxiedNinjas[2] === 'Hattori',
  'Array items accessed through positive indexes on a proxy.'
);

assert(
  ninjas[-1] === undefined && ninjas[-2] === undefined && ninjas[-3] === undefined,
  'Items cannot be accessed through negative indexes on an array.'
);

assert(
  proxiedNinjas[-1] === 'Hattori' && proxiedNinjas[-2] === 'Kuma' && proxiedNinjas[-3] === 'Yoshi',
  'But they can be accessed through negative indexes on a proxy.'
);

proxiedNinjas[-1] = 'Hachi';
assert(
  proxiedNinjas[-1] === 'Hachi' && ninjas[2] === 'Hachi',
  'Items can be changed through negative indexes.'
);

/**
 * NOTE
 * We turn the property into a number by using the unary plus operator (index = +index).
 */
