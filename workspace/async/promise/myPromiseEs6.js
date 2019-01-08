const isFunction = variable => typeof variable === "function";

const __ = new WeakMap();
function get(that, key) {
  try {
    return __.get(that)[key];
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
function set(that, key, value) {
  const lastValue = __.get(that);
  const newValue = {
    ...lastValue,
    [key]: value
  };
  __.set(that, newValue);
}

const promiseStatus = Symbol("status");
const promiseValue = Symbol("value");
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
    set(this, promiseStatus, PENDING);
    set(this, promiseValue, undefined);
    set(this, fulfilledCallbackQueue, []);
    set(this, rejectedCallbackQueue, []);
    try {
      fn(this[resolve].bind(this), this[reject].bind(this));
    } catch (e) {
      this[reject](e);
    }
  }

  [resolve](val) {
    const run = () => {
      if (get(this, promiseStatus) !== PENDING) return;
      const runFulfilled = value => {
        let cb;
        while ((cb = get(this, fulfilledCallbackQueue).shift())) {
          cb(value);
        }
      };
      const runRejected = error => {
        let cb;
        while ((cb = get(this, rejectedCallbackQueue).shift())) {
          cb(error);
        }
      };
      if (val instanceof MyPromise) {
        val.then(
          value => {
            set(this, promiseValue, value);
            set(this, promiseStatus, FULFILLED);
            runFulfilled(value);
          },
          err => {
            set(this, promiseValue, err);
            set(this, promiseStatus, REJECTED);
            runRejected(err);
          }
        );
      } else {
        set(this, promiseValue, val);
        set(this, promiseStatus, FULFILLED);
        runFulfilled(val);
      }
    };
    setTimeout(run, 0);
  }
  [reject](err) {
    if (get(this, promiseStatus) !== PENDING) return;
    const run = () => {
      set(this, promiseStatus, REJECTED);
      set(this, promiseValue, err);
      let cb;
      while ((cb = get(this, rejectedCallbackQueue).shift())) {
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
      switch (get(this, promiseStatus)) {
        case PENDING:
          const newFulfilledCallbackQueue = [
            ...get(this, fulfilledCallbackQueue),
            fulfilled
          ];
          set(this, fulfilledCallbackQueue, newFulfilledCallbackQueue);
          const newRejectedCallbackQueue = [
            ...get(this, rejectedCallbackQueue),
            rejected
          ];
          set(this, rejectedCallbackQueue, newRejectedCallbackQueue);
          break;
        case FULFILLED:
          fulfilled(get(this, promiseValue));
          break;
        case REJECTED:
          rejected(get(this, promiseValue));
          break;
      }
    });
  }
}
