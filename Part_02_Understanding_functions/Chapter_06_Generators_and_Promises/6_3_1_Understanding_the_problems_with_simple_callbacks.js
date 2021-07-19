/** 6.3.1 - Understanding the problems with the simple callbacks */

/**
 * We use asynchronous code because we don't want to block the execution of application (thereby
 * disappointing our users) while long-running tasks are executing. Currently, we solve this 
 * problem with callbacks: To a long-running task we provide a function, a callback that's invoked
 * when the task is finally done.
 * 
 * For example, fetching a JSON file from a server is a long-running task, during which we don't
 * want to make the application unresponsive for our users. Therefore, we provide a callback that
 * will be invoked when the task done:
 * 
    getJSON('data/ninjas.json', function() {
      // Handle results 
    });
 * 
 * Naturally, during this long-running task, errors can be happen. And the problem with callbacks
 * is that you can't use built-in language construct, such as try-catch statements, in the 
 * following way:
 * 
    try {
      getJSON('data/ninjas/json', function() {
        // Handle results
      });
    } catch (e) { // Handle errors }
 * 
 * 
 * 
 */
