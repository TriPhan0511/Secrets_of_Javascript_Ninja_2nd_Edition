/** 5.6.2 - Private variables caveat */

/**
 * In Javascript, there's nothing stopping us from assigning properties created on one object
 * to another object. For example, we can easily rewrite the code from the listing 5.11 into
 * something like the following.
 */

/** Listing 5.12 - Private variables accessed through functions, not objects! */

function Ninja() {
  let feints = 0;

  this.getFeints = function () {
    return feints;
  };

  this.feint = function () {
    feints++;
  };
}

let ninja1 = new Ninja();
ninja1.feint();

let imposter = {};

// Makes the getFeints function of ninja1 accessible through the imposter
imposter.getFeints = ninja1.getFeints;

// Verifies that we can access the supposedly private variable of ninja1
assert(imposter.getFeints() === 1, 'The imposter has access to the feints variable!');

/**
 * This example illustrates that there aren't any private object variables in Javascript,
 * but that we can use closures created by object methods to have a "good enough" alternative.
 * Still, even though it isn't the real thing, lots of developers find this way of hidding
 * information useful.
 */
