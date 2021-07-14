/** Listing 5.11 - Approximate private variables with closures */

function Ninja() {
  let feints = 0;

  this.feint = function () {
    feints++;
  };

  this.getFeints = function () {
    return feints;
  };
}

let ninja1 = new Ninja();
assert(ninja1.feints === undefined, 'And the private data is inaccessible to us.');
ninja1.feint();
assert(ninja1.getFeints() === 1, "We're able to access the internal feint count.");

let ninja2 = new Ninja();
assert(ninja2.getFeints() === 0, 'The second Ninja object gets its own feints variable.');
