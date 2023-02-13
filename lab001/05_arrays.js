// Array declaration and referencing
let nums = [12, 22, 5, 28];
console.log(nums[2]) ; //  5

// ES5
// for (let i = 0; i < nums.length; i++) {
//    console.log(nums[i] )
// }

// ES6
for (const n of nums) {
  console.log(n);
}

// Manipulating arrays.
//     push/pop - add/remove at the tail
// console.log('====== Push/Pop demo ====');
// nums.push(10); // add to tail of array
// console.log("After push:\t\t " + nums);

// const popped = nums.pop(); // remove from tail of array
// console.log("After pop:\t\t" + nums);
// console.log("Removed: " + popped);

//     shift/unshift - remove/add at the head
// console.log('====== shift/unshift demo ====');
// nums.unshift(3);
// console.log("After unsfift:\t" + nums);

// const shifted = nums.shift();
// console.log("After shift:\t\t" + nums);
// console.log("Removed: " + shifted);

