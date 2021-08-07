/** 11.2 - ES6 modules */

/**
 * ES6 modules are designed to marry the advantages fo CommonJS and AMD:
 *
 *  _ Similar to CommonJS, ES6 modules have a relatively simple syntax, and ES6
 *    modules are file based (one module per file.)
 *
 *  _ Similar to AMD, ES6 modules provide support for asynchronous module loading.
 */

/**
 * The main idea behind ES6 modules is that only the identifiers explicitly exported
 * from a module are accessible from outside that module. All other identifiers, even
 * the ones defined in top-level scope (what would be global in standard Javascript),
 * are accessible only from within the module. This wa inspired by CommonJS.
 *
 * To provide this functionality, ES6 introduces two new keywords:
 *
 *  _ export - For making certain identifiers available outside the module.
 *
 *  _ import - For importing exported module identifiers.
 */

/**
 * The syntax for exporting and importing module functionality is simple, but it has
 * a lot of subtle nuances that we'll explore slowly, step by step.
 */
