/** Listing 9.13 - Simulating array-like methods */

/**
 * There are times when we may want to create an object that contains a collection of data.
 * If the collection was all we were worried about, we could use an array. But in certain
 * case, there may be more state to store than just the collection itself - perhaps we need
 * to store some of metadata regarding the collected items.
 *
 * One option may be to create a new array every time you wish to create a new version of
 * such an object, and add the metadata properties and methods to it. Rememeber, we can add
 * properties and methods to an object as we please, including arrays. Generally, however,
 * this can be slow, no to mention tedious.
 *
 * Let's examine the possibility of using a normal object and giving it the functionality
 * we desire. Methods that know how to deal with collections already exist on the Array
 * object; can we trick them into working on our own objects? Turns out that we can, as
 * shown in the following listing.
 */

const elems = {
  // Stores the count of elements.
  // The array needs a place to store the number of items it's storing.
  length: 0,

  // Implements the method to add elements to a collection
  // The prototype for Array has a method to do this, so why not use it instead of reinventing the wheel?
  add: function (elem) {
    Array.prototype.push.call(this, elem);
  },

  // Implememts the gather method to find elements by their id values and
  // add them to the collection
  gather: function (id) {
    this.add(document.getElementById(id));
  },

  // Implements the method to find elements in the collection.
  // Similar to the add method, it reuses the existing find method accessible to arrays.
  find: function (callback) {
    return Array.prototype.find.call(this, callback);
  },
};

elems.gather('first');
assert(elems.length === 1 && elems[0].nodeType, 'Verify that we have an element in our stash.');

elems.gather('second');
assert((elems.length === 2) & elems[1].nodeType, 'Verify the other insertion.');

const found = elems.find((elem) => elem.id === 'second');
assert(found && found.id === 'second', "We've found our element.");

/**
 * In this example, we create a "normal" object and instrument it to mimic some of the behaviors
 * of an array. First we define a length property to record the number of elements that are stored,
 * just like an array. The we define a method to add an element to the end of the simulated array,
 * calling this method add:
 * 
      add: function (elem) {
        Array.prototype.push.call(this, elem);
      },
 * 
 * Rather than write our own code, we can use a native method of Javascript arrays:
 * Array.prototype.push.
 * 
 * Normally, the Array.proptotype.push method would operate on its own array via 
 * its function context. But here, we're tricking the method to use our object as
 * its context by using the call method (remember chapter 4) and forcing our object
 * to be the context of the push method. (Notice how we could've just as easily used 
 * the apply method.) The push method, which increments the length property (thinking
 * that it's the length property of an array), adds a numbered property to the object
 * referencing the passed element. In a way, this behavior is almost subversive, but
 * it exemlifies what we can do with mutable object contexts.
 * 
 * The add method expects an element reference to be passed for storage. Although
 * sometimes we may have such a reference around, more often than not we won't, so
 * we also define a convinience method, gather, that looks up the element by its 
 * id value and adds it to storage:
 * 
        gather: function (id) {
          this.add(document.getElementById(id));
        },
 * 
 * Finally, we also define a find method that lets us find an arbitrary item in our
 * custom object, by taking advantage of the built-in array find method:
 * 
        find: function (callback) {
          return Array.prototype.find.call(this, callback);
        },
 * 
 */
