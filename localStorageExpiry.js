const ogSet = localStorage.setItem;

localStorage.setItem = function (key, value, time) {
  ogSet.call(this, key, value);
  setTimeout(() => {
    localStorage.removeItem(key)
  }, time);
};

localStorage.setItem('name', 'value', 5000);
