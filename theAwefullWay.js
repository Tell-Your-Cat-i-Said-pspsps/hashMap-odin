class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  constructor(head) {
    this.head = head;
    this.tail = this.head;
  }
  listAppend(key, value) {
    const newNode = new Node(key, value);
    this.tail.next = newNode;
    this.tail = newNode;
  }

  listSize() {
    let size = 1;
    let next = this.head.next;
    while (next !== null) {
      size++;
      next = next.next;
    }

    return size;
  }
  listHas(key) {
    let index = 0;
    let current = this.head;
    const size = this.listSize();
    while (index < size) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
      index++;
    }
    return false;
  }
  listGetValue(key) {
    let index = 0;
    let current = this.head;
    const size = this.listSize();
    while (index < size) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
      index++;
    }
    return null;
  }
  listChangeNodeValue(key, value) {
    let index = 0;
    let current = this.head;
    const size = this.listSize();
    while (index < size) {
      if (current.key === key) {
        current.value = value;
        return true;
      }
      current = current.next;
      index++;
    }
    return false;
  }
  removeAt(key) {
    let index = 0;
    let found = false;
    let current;
    let newList;
    const size = this.listSize();
    if (this.head.key !== key) {
      newList = new LinkedList(new Node(this.head.key, this.head.value));
      current = this.head.next;
    } else if (this.head.next !== null) {
      let head = this.head.next;
      newList = new LinkedList(head);
      current = head.next;
    } else {
      return null;
    }
    while (index < size && current !== null) {
      if (current.key !== key) {
        newList.listAppend(current.key, current.value);
      } else {
        found = true;
      }
      current = current.next;
      index++;
    }
    this.head = newList.head;
    return found;
  }
  listKeys(current = this.head) {
    if (current.next === null) {
      return [current.key];
    } else {
      let tmp = this.listKeys(current.next);
      console.log(tmp);
      return tmp;
    }
  }
  listValues(current = this.head) {
    if (current.next === null) {
      return [current.value];
    } else {
      let tmp = this.listValues(current.next);
      console.log(tmp);
      return tmp;
    }
  }
  listEntries(current = this.head) {
    if (current.next === null) {
      return [[current.key, current.value]];
    } else {
      let tmp = this.listEntries(current.next);
      return tmp;
    }
  }
}
class hashMap {
  constructor(capacity) {
    this.buckets = new Array(capacity);
    this.load = 0;
    this.capacity = capacity;
    this.loadFactor = Math.round(this.capacity * 0.75);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 7;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }
  has(key) {
    const index = key % this.buckets.length;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (this.buckets[index] !== null && this.buckets[index].listHas(key)) {
      return true;
    }
    return false;
  }
  set(key, value) {
    const index = key % this.buckets.length;
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.buckets[index] == null) {
      const head = new Node(key, value);
      this.buckets[index] = new LinkedList(head);
      this.load++;
    } else {
      if (this.has(key)) {
        this.buckets[index].listChangeNodeValue(key, value);
      } else {
        this.buckets[index].listAppend(key, value);
      }
    }
  }
  remove(key) {
    const index = key % this.buckets.length;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (this.buckets[index] !== null) {
      const ans = this.buckets[index].removeAt(key);
      if (ans === null) {
        delete this.buckets[index];
        return true;
      }
      console.log(this.buckets);
      return ans;
    }
    return false;
  }
  length() {
    let sum = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        sum += this.buckets[i].listSize();
      }
    }
    return sum;
  }
  get(key) {
    const index = key % this.buckets.length;
    if (this.buckets[index]) {
      return this.buckets[index].listGetValue(key);
    }
  }
  clear() {
    this.buckets = new Array(this.capacity);
  }
  keys() {
    let arrOfKeys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        const arr = this.buckets[i].listKeys();
        arrOfKeys = arrOfKeys.concat(arr);
      }
    }
    return arrOfKeys;
  }
  values() {
    let arrOfValues = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        const arr = this.buckets[i].listValues();
        arrOfValues = arrOfValues.concat(arr);
      }
    }
    return arrOfValues;
  }
  entries() {
    let arrOfEntries = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        const arr = this.buckets[i].listEntries();
        arrOfEntries = arrOfEntries.concat(arr);
      }
    }
    return arrOfEntries;
  }
}
