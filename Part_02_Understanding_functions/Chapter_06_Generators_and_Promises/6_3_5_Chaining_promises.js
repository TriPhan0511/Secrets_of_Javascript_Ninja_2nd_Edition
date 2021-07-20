/** 6.3.5 - Chaining promises */

/**
 * Earlier in the chapter, you saw how, by using the then method on a promise, we
 * can register a callback that will be executed if a promise is successfully resolved. What
 * we didn't tell you is that calling the then method also returns a new promise. So there's
 * nothing stopping us from chaining as many then method as we want; see the following code.
 */

/** Listing 6.16 - Chaining promises with then */

getJSON(
  'http://127.0.0.1:5500/Secrets_of_Javascript_Ninja_2nd_Edition/Part_02_Understanding_functions/Chapter_06_Generators_and_Promises/JSON_files/ninjas.json'
)
  .then((ninjas) => getJSON(ninjas[0].missionsUrl))
  .then((missions) => getJSON(missions[0].detailsUrl))
  .then((mission) => assert(mission !== null, 'Ninja mission obtained!'))
  .catch((error) => fail(`An error has occured: ${error}`));

/***
 * This creates a sequence of promises that will be, if everything goes according to plan,
 * resolved one after another. First, we use the:
 * 
    getJSON(
      'http://127.0.0.1:5500/Secrets_of_Javascript_Ninja_2nd_Edition/Part_02_Understanding_functions/Chapter_06_Generators_and_Promises/JSON_files/ninjas.json'
    )
 * 
 * function to fetch a list of ninjas from the file on the server. After we receive that list,
 * we take the information about the first ninja, and we request a list of missions the ninja
 * is assigned to: getJSON(ninjas[0].missionsUrl). Later, when these missions come in, we make
 * yet another request for the details of the first mission: getJSON(missions[0].detailsUrl).
 * Finally, we log the details of the mission. 
 */

/**
 * Writing such code using standard callbacks would result in a deeply nested
 * sequence of callbacks. Identifying the exact sequence of steps wouldn't
 * be easy, and God forbid we decide to add in an extra step somewhere in
 * the middle.
 */
// ------------------------------------------------------------------------

/** CATCHING ERRORS IN CHAINED PROMISES */

/**
 * When dealing with sequence of asynchronous steps, an error can occur in any step.
 * We already know that we either can provide a second, error callback to the then call,
 * or can chain in a catch call that takes an error callback. When we care about only the
 * success/failure of the entire sequence of steps, supplying each step with special error
 * handling might be tedious. So, as shown in listing 6.16, we can take advantage of the
 * catch method that you saw earlier:
 * 
      ...catch((error) => fail(`An error has occured: ${error}`));
 * 
 * If a faiure occurs in any of the previous promises, the catch method catches it. If no
 * error occurs, the program flow continues through it, unobstructed.
 */
