const isFunction = variable => typeof variable === "function";

const status = Symbol("status");
const value = Symbol("value");
const fulfilledCallbackQueue = Symbol("fulfilledCallbackQueue");
const rejectedCallbackQueue = Symbol("rejectedCallbackQueue");

const PENDING = Symbol("pending");
const FULFILLED = Symbol("fulfilled");
const REJECTED = Symbol("rejected");

const resolve = Symbol("resolve");
const reject = Symbol("reject");

class MyPromise {
  constructor(fn) {
    if (!isFunction(fn)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    this[status] = PENDING;
    this[value] = undefined;
    this[fulfilledCallbackQueue] = [];
    this[rejectedCallbackQueue] = [];
    try {
      fn(this[resolve].bind(this), this[reject].bind(this));
    } catch (e) {
      this[reject](e);
    }
  }

  [resolve](val) {
    const run = () => {
      if (this[status] !== PENDING) return;
      const runFulfilled = value => {
        let cb;
        while ((cb = this[fulfilledCallbackQueue].shift())) {
          cb(value);
        }
      };
      const runRejected = error => {
        let cb;
        while ((cb = this[rejectedCallbackQueue].shift())) {
          cb(error);
        }
      };
      if (val instanceof MyPromise) {
        val.then(
          value => {
            this[value] = value;
            this[status] = FULFILLED;
            runFulfilled(value);
          },
          err => {
            this[value] = err;
            this[status] = REJECTED;
          }
        );
      } else {
        this[value] = val;
        this[status] = FULFILLED;
        runFulfilled(val);
      }
    };
    setTimeout(run, 0);
  }
  [reject](err) {
    if (this[status] !== PENDING) return;
    const run = () => {
      this[status] = REJECTED;
      this[value] = err;
      let cb;
      while ((cb = this[rejectedCallbackQueue].shift())) {
        cb(err);
      }
    };
    setTimeout(run, 0);
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      const fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            const res = onFulfilled(value);
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          onRejectedNext(err);
        }
      };
      const rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            const res = onRejected(error);
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          onRejectedNext(err);
        }
      };
      switch (this[status]) {
        case PENDING:
          this[fulfilledCallbackQueue].push(fulfilled);
          this[rejectedCallbackQueue].push(rejected);
          console.log(this);
          break;
        case FULFILLED:
          fulfilled(this[value]);
          break;
        case REJECTED:
          rejected(this[value]);
          break;
      }
    });
  }
}

function fn(resolve, reject) {
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      for (let k = 0; k < 1000; k++) {}
    }
  }
  resolve(1);
  console.log("fn");
}

const p1 = new MyPromise(fn);
const p2 = p1
  .then(v => {
    console.log("p2", v);
    return v + 1;
  })
  .then(v => {
    console.log("p2-2", v);
  });

const p3 = p1.then(v => {
  console.log("p3", v);
});

console.log(p1);
