function Event() {
  this.subs = [];

  this.subscribe = (fn) => {
    this.subs.push(fn);
  };

  this.unsubscribe = (fn) => {
    this.subs = this.subs.filter((f) => f !== fn);
  };

  this.fire = function (ev) {
    for (const sub of this.subs) {
      sub.call(this, ev);
    }
  };
}

/* Test cases */
// // 1st observer
const eventHandler = (item) => {
  console.log(`fired: ${item}`);
};

// // 2nd observer
const eventHandler2 = (item) => {
  console.log(`Moved: ${item}`);
};

const event = new Event();

// // subscribe 1st observer
event.subscribe(eventHandler);
event.fire('event #1');

// // unsubscribe 1st observer
event.unsubscribe(eventHandler);
event.fire('event #2');
// Output: "fired: event #1"

// // subscribe 1st & 2nd observer
event.subscribe(eventHandler);
event.subscribe(eventHandler2);
event.fire('event #3');
// Output: "fired: event #3"
// Output: "moved: event #3"
