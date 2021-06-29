/**
 * 8.1.3 - Using getters and setters to define computed properties
 */

/**
 * In addition to being able to control access to certain object properties, getters and setters can be used to
 * define COMPUTED PROPERTIES, properties whose value is calculated per request.
 * Computed properties don't store a value; they provide a get and/or set method to retrieve and set
 * other properties indirectly. In the following example, the object has two properties, name and clan, which
 * we'll use to compute the property fullTitle.
 */

// // Defines a shogun object
// const shogun = {
//   name: 'Yoshiaki',
//   clan: 'Ashikaga',

//   // Defines a getter method on a fullTitle property of an object literal that
//   // calculate the value by concatenating two object properties.
//   get fullTitle() {
//     return `${this.name} ${this.clan}`;
//   },

//   // Defines a setter method on a fullTitle property of an object litearl that
//   // splits the passed-in value and updates two standard properties.
//   set fullTitle(value) {
//     let segments = value.split(' ');
//     this.name = segments[0];
//     this.clan = segments[1];
//   },
// };

// // Tests
// // The name and clan properties are normal properties whose values are directly obtained.
// // Accessing the fullTitle property calls the get method, which computes the value.
// assert(shogun.name === 'Yoshiaki', 'Our shogun Yoshiaki');
// assert(shogun.clan === 'Ashikaga', 'Of clan Ashikaga');
// assert(shogun.fullTitle === 'Yoshiaki Ashikaga', 'The full name is now Yoshiaki Ashikaga');

// // Assigning a value to the fullTitla property calls the set method,
// // which computes and assigns new values to the name and clan properties.
// shogun.fullTitle = 'Ieyasu Tokugawa';
// assert(shogun.name === 'Ieyasu', 'Our shogun Ieyasu');
// assert(shogun.clan === 'Tokugawa', 'Of clan Tokugawa');
// assert(shogun.fullTitle === 'Ieyasu Tokugawa', 'The full name is now Ieyasu Tokugawa');

/**
 * To be honest, we don;t have to use computed properties. A method called getFullTitle could be equally useful,
 * but computed properties can improve the conceptual clarity of our code.
 * If a certian value (in this case, the fullTitle value) depends only on the internal state of the object
 * (in this case, on the name and clan properties), it makes perfet sense to represent it as a data field,
 * a property, instead of function.
 */

/**
 * You've seen the getter and setter methods are a useful addition to the language that can help us deal with
 * logging, data validation, and detecting changes in property values. Unfortunately, sometimes this isn't enough.
 * In certain cases, we need to control all types of interactions with our objects, and for this, we can use a
 * completely new type of object: a proxy.
 */
