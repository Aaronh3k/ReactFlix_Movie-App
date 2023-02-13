const name = {
    first: 'Diarmuid',
    last: "O'Connor"
  };
  
  const me = {
    name: name,
    // name,  // Shorthand 
    address: '1 Main Street',
    age: 21,
    finance: {
      amount: 20.2,
      type: 'D',
      bank: 'Allied Irish Bank'
    },
    male: true
  };
  

  console.log(me.finance.deposit)
  console.log(me.finance.deposit.bank)