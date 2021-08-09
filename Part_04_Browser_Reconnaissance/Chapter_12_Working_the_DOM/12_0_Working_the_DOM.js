/** Chapter 12 - Working the DOM */

/**
 * One of the primary means for achieving highly dynamic web applications that respond to
 * user action is by modifying the DOM. But if we were to open up a Javascript library,
 * you'd notice the length and complexity of the code behind simple DOM operations.
 * Even presumably simple operations like cloneNode and removeChild have relatively
 * complex implementations.
 *
 * This raises two questions:
 *
 *  _ Why is this code so complex?
 *
 *  _ Why do you need to understand how it works if the library will take care of it for you?
 *
 * The most compelling reason is performance. Understanding how DOM modification works in
 * libraries can allow you to write better and faster code that uses the library or,
 * alternatively, enable you to use those techniques in your own code.
 */

/**
 * So we'll start chapter by seeing how to creates new parts of our pages, on demand,
 * by injecting arbitrary HTML. We'll continue by examining all the conundrums that
 * browers throw at us with respect to element properties and attributes, and we'll
 * discover why the results aren't always exactly what we might expect.
 */

/**
 * The same goes for Cascading Style Sheets (CSS) and the styling elements. Many of
 * the difficulties that we'll run into when constructing a dynamic web application
 * stem from the complications of setting and getting element styling. This book can't
 * cover all that's known about handling element styling, but the core essentials
 * are discussed.
 */

/**
 * We'll finish the chapter by taking a look at some of the performance difficulties
 * that can arise if you don't pay attention to the way you modify and read information
 * from the DOM. Let's start by seeing how to inject arbitrary HTML into our pages.
 */
