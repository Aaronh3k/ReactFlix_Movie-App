const me = {
	name : "Diarmuid O'Connor",   
	address : '1 Main Street',
	age : 21,                
	bankBalance : 20.2,
	male : true    
   } ;

// Add a new property
me.employer = 'WIT' ;
console.log (me.name + ' works for ' + me.employer) ;

// Remove a property
delete me.age ;
console.log (me.age) ; // undefined