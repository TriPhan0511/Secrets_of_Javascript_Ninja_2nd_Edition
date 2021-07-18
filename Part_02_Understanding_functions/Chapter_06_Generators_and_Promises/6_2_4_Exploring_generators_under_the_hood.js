/** 6.2.4 - Exporing generators under the hood */

/**
 * So far we know that calling a generator doesn't execute it. Instead, it creates an iterator
 * that we can use to request values from the generator. After a generator produces (or yields)
 * a value, it suspends its execution and waits for the next request. So in a way, a generator
 * works almost like a small program, a state machine that moves between states:
 *
 *  _ Suspended start - When the generator is created, it starts in this state. None of the
 *    generator's code executed.
 *
 *  _ Executing - The state in which the code of the generator is executed. The execution
 *    continues either from the beginning or from where the generator was last suspended.
 *    A generator moves to this state when the matching iterator's next method is called,
 *    and there exists code to be executed.
 *
 *  _ Suspended yield - During execution, when a generator reaches a yield expression, it
 *    creates a new object carrying the return value, yields it, and suspends its execution.
 *    This is the state in which the generator is paused and is waiting to continue its execution.
 *
 *  _ Completed - If during execution the generator either runs into a return statement or runs
 *    out of code to execute, the generator moves into this state.
 */
// ----------------------------------------------------------------------------------------------------

/** TRACKING GENERATORS WITH EXECUTION CONTEXTS */

/**
 * In the previous chapter, we introduced the execution context, an internal Javascript
 * mechanism used to track the execution of functions. Although somewhat special,
 * generators are still functions, so let's take a closer look by exploring the relationship
 * between them and execution contexts. We'll start with a simple code fragment:
 */

// Defines a generator function
function* NinjaGenerator(action) {
  yield `Hattori ${action}`;
  return `Yoshi ${action}`;
}

// Creates an iterator by calling the NinjaGenerator generator function
const ninjaIterator = NinjaGenerator('skulk');

// Creates two objects by calling the ninjaIterator's next method
const result1 = ninjaIterator.next();
const result2 = ninjaIterator.next();

/**
 * Here we reuse our generator that produces two values: Hattori skulk and Yoshi skulk.
 */

/**
 * Now, we'll explore the state of the application, the execution context stack at
 * various points in the application execution.
 * 
 * (1) Before calling the NinjaGenerator function, because we're executing global code,
 * the execution context stack contains only the global execution context, which
 * references the global environment in which our identifiers are kept. Only the
 * NinjaGenerator identifier references a function, while the values of all other
 * identifiers are undefined.
 * 
 * (2) When we make the call to the NinjaGenerator function
 * 
    const ninjaIterator = NinjaGenerator('skulk');
 * 
 * the control flow enters the generator and, as it happens when we enter any other functions,
 * a new NinjaGenerator execution context item is created (alongside the matching lexical 
 * environment) and pushed onto the stack. But because generators are special, none of function
 * code is executed. Instead, a new iterator, which we'll refer to in the code as ninjaIterator,
 * is created and returned. Because the iterator is used to control the execution of the generator,
 * the iterator gets a reference to the execution context in which it was created.
 * 
 * An interesting happens when the program execution leaves the generator. Typically, when program
 * execution returns from a standard function, the matching execution context is popped from the
 * stack and completely discarded. But this isn't the case with generators.
 * 
 * The matching NinjaGenerator stack item is popped from the stack, but it's not discarded, because
 * the ninjaIterator keeps a reference to it. You can see it as an analogue to closures. In closures,
 * we need to keep alive the variables that are alive at the moment the function closure is created,
 * so our functions keep a reference to the enviroment in which they were created. In this way, we
 * make sure that the environment and its variables are alive as long as the function itself.
 * Generators, on the other hand, have to be able to resume their execution. Because the execution
 * of all functions is handled by execution contexts, the iterator keeps a reference to its execution
 * context, so that it's alive for as long as the iterator needs it.
 * 
 * Another interesting thing happens when we call the next method on th iterator:
 * 
    const result1 = ninjaIterator.next();
 * 
 * If this was a standard straightforward function call, this would cause the creation of a new next()
 * execution context item, which would be placed on the stack. But as you might have noticed, generators
 * are anything but standard, and a call to the next method of an iterator behaves a lot differently.
 * It reactivates the matching execution context, in this case, the NinjaGenerator context, and places
 * it on the top of the stack, continuing the execution where it left off.
 * 
 * A crucial difference between standard functions and generators is standard functions can only be 
 * called anew, and each call creates a new execution context. In contrast, the execution context of
 * a generator can be temporarily suspended and resumed at will.
 * 
 * In our example, because this is the first call to the next method, and the generator hasn't started
 * executing, the generator starts its execution and moves to the Executing state. The next interesting
 * thing happens when our generator function reaches this point:
 * 
    yield `Hattori ${action}`;
 * 
 * The generator determines that the expression equals Hattori skulk, and the evaluation reaches the
 * yield keyword. This means that Hattori skulk is the first intermediary result of our generator and
 * that we want to suspend the execution of the generator and return that value. In terms of the 
 * application state, a similar thing happens as before: the NinjaGenerator context is taken off the
 * stack, but it's not completely discarded, because ninjaIterator keeps a reference to it. The 
 * generator is now suspended, and has moved to the Suspended Yield state, without blocking. The
 * program execution resumes in global code, by storing the yield value to result1.
 * 
 * The code continues by reaching another iterator call:
 * 
    const result2 = ninjaIterator.next();
 * 
 * At this point, we go through the procedure once again: we reactivate the NinjaGenerator context 
 * referenced by ninjaIterator, push it onto the stack, and continue the execution where we left off.
 * In this case, the generator evaluates the expression `Yoshi ${action}`. But this time there's no 
 * yield expression, and instead the program encounters a return statement. This returns the value
 * Yoshi skulk and completes the generator's execution by moving the generator into the Complete state.
 */

/**
 * Uff, this was something! We went deep into how generators work under the hood to show you that all
 * the wonderful benefits of generators are a side effect of the fact that a generator's execution
 * context is kept alive if we yield from a generator, and not destroyed as is the case with
 * return values and standard functions.
 */
