// console.log('1');

// new Promise((resolve, reject) => {
//   console.log('2');
//   reject();
// }).then(() => {
//   console.log('3');
// }, () => {
//   console.log('3-1');
// });

// setTimeout(() => {
//   console.log('4');
// })

// console.log('5');

console.log(1);

setTimeout(() => {
  console.log(4);
  Promise.resolve().then(() => {
    console.log(2);
  }).then(() => {
    console.log(3);
  });
}, 0);

setTimeout(() => {
  console.log(5);
}, 0);

Promise.resolve().then(() => {
  console.log(21);
}).then(() => {
  console.log(31);
});

console.log(6);