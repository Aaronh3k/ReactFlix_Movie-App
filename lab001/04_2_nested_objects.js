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

console.log(
  me.name.first +
    ' banks with ' +
    me.finance['bank'] +
    ' to the value of ' +
    me.finance.amount
);

const keys = Object.keys(me)
console.log(keys)

// const values = Object.values(me)
// console.log(values)

// console.log('address' in me)
// console.log('password' in me)
