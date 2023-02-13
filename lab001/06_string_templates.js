const name = 'Diarmuid' ;
const height = 5.8 ; 
const toMeters = function(feet) { return (feet*0.3048).toFixed(2) }
let text = 
   `My name is ${name} and my height is ${toMeters(height)} meters`;
console.log(text); 
// Multi-line strings
text = (
`My name is ${name} 
and my height is ${toMeters(height)} meters
`);
console.log(text);
// Embedded quotes in a string
text = 
 `I'm "amazed" that we have so many quotation marks to choose from!` ;
console.log(text);
