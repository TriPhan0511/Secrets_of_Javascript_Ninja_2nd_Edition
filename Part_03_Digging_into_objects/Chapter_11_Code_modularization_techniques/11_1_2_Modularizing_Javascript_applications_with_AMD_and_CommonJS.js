/** 11.1.2 - Modularizing Javascript applications with AMD and CommonJS */

/**
 * AMD and CmmonJS are competing module specification standards that allow us to specify
 * Javascript modules. Besides some different syntax and philosophy, the main difference
 * is that AMD was designed explicitly with the browser in mind, whereas CommonJS was
 * designed for a general-purpose Javascript environment (such as servers, with Node.js),
 * without being to the limitations of the browser.
 */
// ------------------------------------------------------------------------------------------------------

/** AMD */
// ------------------------------------------------------------------------------------------------------

/** CommonJS */

/**
 * Whereas AMD was build explicitly for the browser, CommonJS is a module specification designed for
 * a general-purpose Javascript environment. Currently it has the biggest following in the Node.js
 * community.
 *
 * CommonJS uses file-based modules, so we can specify one module per file. To each module, CommonJS
 * exposes a variable, module, with a property, exports, which we can easily extend with additional
 * properties. In the end, the content of module.exports is exposed as the module's public interface.
 *
 * If we want to use a module from other parts of the application, we can require it. The file will
 * be synchronous loaded, and we'll have access to its public interface. This is the reason that
 * CommonJS is much popular on the server, where module fetching is relatively quick because it
 * requires only a file-system read, than on the client, where the module has to be downloaded
 * from a remote server, and where synchronous loading usually means blocking.
 *
 * Let's look at an example that defines our reoccuring MouseCounterModule, this time in CommonJS.
 */

/** Listing 11.4 - Using CommonJS to define a module */

// MouseCounterModule.js

// const $ = require('jQuery');
// let numClicks = 0;
// const handleClick = () => {
//   alert(++numClicks);
// };

// // Modifies the module.exports property to specify the public interface of a module
// module.exports = {
//   countClicks: () => {
//     $(document).on('click', handleClick);
//   },
// };
// ------------------------------------------------------------------------------------------------

/**
 * To include our module our module within a different file, we can write this:
 * 
        const MouseCounterModule = require('MouseCounterModule.js');
        MouseCounterModule.countClicks();
 * 
 */
// ------------------------------------------------------------------------------------------------

/**
 * Because the philosophy of CommonJS dictates one module per file, any code that
 * we put in a file module will be a part of that module. Therefore, there's no
 * need for wraping variables up in immediate functions. All variables defined within
 * a module are safely contained within the scope of the current module and don't
 * leak out to the global scope. For example, all three of our module variables
 * ($, numClikcs and handleClick) are module scoped, even though they're defined
 * in top-level code (outside all functions and blocks), which would technically
 * make them global variables in standard Javascript files.
 *
 * Once again, it's important to note that only variables and functions exposed
 * through the module.exports object are available from outside the module. The
 * procedure is similar to module pattern, only instead of returning a completely
 * new object, the environment provides one that we can extend with our interface
 * methods and properties.
 */

/**
 * CommonJS has a couple of advantages:
 *
 *  _ It has simple syntax. We need to specify only the module.exports properties, while
 *    the rest of the module code stays pretty much the same as if we were writing standard
 *    Javascript. Requiring modules is also simple; we just use the require function.
 *
 *  _ CommonJS is the default module format for Node.js, so we have access to thousand
 *    packages that are available through npm, node's package manager.
 */
