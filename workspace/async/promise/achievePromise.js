function MyPromise(executor) {
  let self = this;
  self.status = "pending";
  self.value = undefined;
  self.reason = undefined;
  function resolve(value) {
    if (self.status === "pending") {
      self.status = "fulfilled";
      self.value = value;
    }
  }
  function reject(reason) {
    if (self.status === "pending") {
      self.status = "rejected";
      self.reason = reason;
    }
  }
  executor(resolve, reject);
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  let self = this;
  if (self.status === "fulfilled") {
    self.value = onFulfilled(self.value);
  }
  if (self.status === "rejected") {
    self.reason = onRejected(self.reason);
  }
  return self;
};

const pro = new MyPromise((resolve, reject) => {
  console.log(1);
  resolve(1);
});

const pro1 = pro.then(
  v => {
    console.log("pro1", v);
    return v + 1;
  },
  () => {
    console.log(3);
  }
);

const pro2 = pro1.then(v => {
  console.log("pro2", v);
  return v + 3;
});

const pro3 = pro2.then(v => {
  console.log("pro3", v);
});
