const me = { 
	name : "Diarmuid O'Connor", // enclose string in " " when it contains a '.   
	address : '1 Main Street',
	age : 21,                
	bankBalance : 20.2,   // millions!!
	male : true    // no comma for the last property
} ;

console.log (me.name + ' lives at ' + me['address']) ;
// Can also use a variable in subscript notation
const bb = 'bankBalance' ;
console.log('Balance = ' + me[bb]) ;
// me.bb won't work

// Changing a property value
me.address = '2 Main Street' ;
console.log (me.name + ' now lives at ' + me['address']) ;