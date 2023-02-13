/*
  Primitive data types in JS
*/
let foo1 = 5;
let foo2 = "Hello";
let foo3 = true;
let foo4 = null;
const Pi = 3.14;
console.log(foo1 + " " + foo2 + " " + 
            foo3 + " " + foo4);
foo1 = 3; // Reassign foo1. No need for let keyword.
foo2 = 10; // JS is dynamically typed. Great, but don't misuse!!
let foo5;
console.log(foo5);
// Pi = 3.141592  // ERROR
