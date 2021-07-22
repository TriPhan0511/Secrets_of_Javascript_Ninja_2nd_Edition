/** CHAPTER 06 - EXERCISES */

/**
 * Exercise 01
 * After running the following code, what are the values of varibales a1 to a4?
 */

/**
    function* EvenGenerator() {
      let num = 2;
      while (true) {
        yield num;
        num = num + 2;
      }
    }

    let generator = EvenGenerator();

    let a1 = generator.next().value; // 2
    let a2 = generator.next().value; // 4
    let a3 = EvenGenerator().next().value; // 2
    let a4 = generator.next().value; // 6
 */

/**
 * Answer:
 * a1 = 2
 * a2 = 4
 * a3 = 2
 * a4 = 6
 */
// ------------------------------------------------------------------------------------

/**
 * Exercise 02
 * What's the content of the ninjas array after running the following code?
 * (Hint: think about how the for-of loop can be implemented with a while loop.)
 */

/**
    function* NinjaGenerator() {
      yield 'Yoshi';
      return 'Hattori';
      yield 'Hanzo';
    }

    const ninjas = [];

    // for (let ninja of NinjaGenerator()) {
    //   ninjas.push(ninja);
    // }

    let ninjaIterator = NinjaGenerator();
    let result = ninjaIterator.next();
    while (!result.done) {
      ninjas.push(result.value);
      result = ninjaIterator.next();
    }
 */

/**
 * Answer
 * The ninjas array will contain only "Yoshi". This happens because the for-of loop
 * iterates over a generator until the generator say it's done (without including
 * the value passed along with done). This happens either when there's no more code
 * in the generator to execute, or when a return statement is encountered.
 */
// ------------------------------------------------------------------------------------

/**
 * Exercise 03
 * What are the values of variables a1 and a2, after running the following code?
 */

/**
    function* Gen(val) {
      val = yield val * 2;
      yield val;
    }

    let generator = Gen(2);
    let a1 = generator.next(3).value;
    let a2 = generator.next(4).value;
 */

/**
 * Answer
 * a1 = 4
 * a2 = 4
 */
// ------------------------------------------------------------------------------------

/**
 * Exercise 4
 * What's the output of the following code?
 */

/**
    const promise = new Promise((resolve, reject) => {
    reject('Hattori');
  });

  promise.then((val) => alert(`Success: ${val}`)).catch((err) => alert(`Error: ${err}`));
 */

/**
 * Answer
 * alert("Error: Hattori")
 */
// ------------------------------------------------------------------------------------

/**
 * Exercise 05
 * What's the output of the following code?
 */

/**
    const promise = new Promise((resolve, reject) => {
      resolve('Hattori');
      setTimeout(() => reject('Yoshi'), 500);
    });

    promise.then((val) => alert(`Success: ${val}`)).catch((err) => alert(`Error: ${err}`));
 */

/**
 * Answer
 * alert("Success: Hattori")
 */
