/** 8.1.3 - Using getters and setters to define computed properties */

/**
 * In addition to being able to control access to certain object properties, getters and setters
 * can be used to define computed propeties, properties whose value is calculated per request.
 * Computed properties don't store a value; they provide a get and/or a set method to retrieve
 * and set other properties indirectly.
 *
 * In the following example, the object has two properties, name and clan, which we'll use to
 * compute the property fullTitle.
 */

/** Listing 8.6 - Defining computed properties */

const shogun = {
  name: 'Yoshiaki',
  clan: 'Ashikaga',

  // Defines a getter method on a fullTitle property of an object literal that
  // calculates the value by concatenating two object properties.
  get fullTitle() {
    return `${this.name} ${this.clan}`;
  },

  // Defines a setter method on a a fullTitle property of an object literal that
  // splits the passed-in value and updates two standard properties.
  set fullTitle(value) {
    let array = value.split(' ');
    this.name = array[0];
    this.clan = array[1];
  },
};

assert(
  shogun.fullTitle === 'Yoshiaki Ashikaga' &&
    shogun.name === 'Yoshiaki' &&
    shogun.clan === 'Ashikaga',
  `The full name is now Yoshiaki Ashikaga.`
);

shogun.fullTitle = 'Ieyasu Tokugawa';
assert(
  shogun.fullTitle === 'Ieyasu Tokugawa' && shogun.name === 'Ieyasu' && shogun.clan === 'Tokugawa',
  'The full name is now Ieyasu Tokugawa.'
);

/**
 * This takes care of both routes: Reading the fullTitle property computes its value,
 * and writing to the fullTitle property modifies the properties that constitute the
 * property value.
 */

/**
 * To be honest, we don't have to use computed properties. A method called
 * getFullTitle could be equally useful, but computed properties can improve the
 * conceptual clarity of our code. If a certain value (in this case, the fullTitle)
 * depends only on the internal state of the object (in this case, on the name and
 * clan properties), it makes perfect sense to represent it as data field, a property,
 * instead of function.
 */

/**
 * This concludes our exploration of getters and setters. You've seen that they're a
 * useful addition to the language that can help us deal with logging, data validation,
 * and detecting changes in property values. Unfortunately, sometimes this isn't enough.
 * In certain cases, we need to control all types of interaction with our objects, and for
 * this, we can use a completely new type of object: a proxy.
 */
