/** 7.2.1 - Side effects of the dynamic nature of Javascript */

/**
 * You've already seen that Javascript is a dynamic language in which properties can be
 * easily added, removed, and modified at will. The same thing holds for prototypes, both
 * function prototypes and object prototype.
 *
 * See the following listing.
 */

/** Listing 74. - With prototypes, everything can be changed at runtime */

// Defines a constructor that
// creates a Ninja with a single Boolean property
function Ninja() {
  this.swung = true;
}

// Creates an instance of Ninja
const ninja1 = new Ninja();

// Adds a method to the prototype after the object has been created
Ninja.prototype.swingSword = function () {
  return this.swung;
};
// Shows that the medthod exists in the object
assert(ninja1.swingSword(), 'Method exists, even out of order.');

// Completely overrides the Ninja's prototype with a new object via the pierce method
Ninja.prototype = {
  pierce: function () {
    return true;
  },
};

// Even though we've completely replaced the Ninja constructor's prototype,
// our Ninja can still swing a sword, because it keeps a reference to the old Ninja prototype.
assert(ninja1.swingSword(), 'Our ninja can still swing!');

// Newly created ninjas reference the new prototype,
// so they can pierce but can't swing.
const ninja2 = new Ninja();
assert(ninja2.pierce(), 'Newly created ninjas can pierce.');
assert(!ninja2.swingSword, 'But they can not swing.');

/**
 * We override the Ninja's prototype by assigning it to a completely new object that has
 * a pierce method.
 *
 * As you can see, even though the Ninja function doesn't reference the old Ninja prototype,
 * the old prototype is still kept alive by the ninja1 instance, which can still, through
 * the prototype chain, access the swingSword method. But if we create new objects after
 * this prototype switcheroo, all newly created instances reference the new prototype.
 *
 * The reference between an object and the function's prototype is established at the time
 * of object instantiation. Newly created objects will have a reference to the new prototype
 * and will have access to the pierce method, where as the old, pre-prototype-changed objects
 * keep their original prototype, happily swinging their swords.
 */

/**
 * We've explored how prototypes work and how they're related to object instantiation.
 * Now we can continue onward by learning more about the nature of those objects.
 */
