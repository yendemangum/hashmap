function Node(value, next) {
  return { value, next };
}

function LinkedList(value) {
  let listHead = Node(value, null);
  function append(value) {
    const node = Node(value, null);
    let end = tail(listHead);
    end.next = node;
  }
  function prepend(value) {
    const copy = listHead;
    const node = Node(value, copy);
    listHead = node;
  }
  function sizeUp(first) {
    if (first.next == null) {
      return 1;
    } else {
      return 1 + size(first.next);
    }
  }
  function head() {
    return listHead;
  }
  function tail(node) {
    if (node.next == null) {
      return node;
    } else {
      return tail(node.next);
    }
  }
  function at(index, first) {
    if (index == 0) {
      return first;
    } else {
      return at(index - 1, first.next);
    }
  }
  function pop(node) {
    if (node.next.next == null) {
      node.next = null;
    } else if (node.next == null) {
      return;
    } else {
      pop(node.next);
    }
  }
  function contains(value, node) {
    if (node.value == value) {
      return true;
    } else if (node.next == null) {
      return false;
    } else return contains(value, node.next);
  }
  function find(value, node, count) {
    if (count == undefined) {
      count = 0;
    }
    if (node.value == value) {
      return count;
    } else if (node.next == null) {
      return null;
    } else find(value, node.next, count + 1);
  }
  function toString(node) {
    if (node == undefined) {
      node = listHead;
    }
    if (node.next !== null) {
      return "( " + node.value + " ) -> " + toString(node.next);
    } else if (node.next == null) {
      return "( " + node.value + " ) -> " + node.next;
    }
  }
  function insertAt(value, index, first) {
    if (index == 0) {
      const node = Node(value, first.next);
      first.next = node;
    } else insertAt(value, index - 1, first.next);
  }
  function removeAt(index, first) {
    if (index == 1) {
      const copy = first.next.next;
      first.next = copy;
    } else removeAt(index - 1, first.next);
  }
  return {
    append,
    prepend,
    sizeUp,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}

function HashMap() {
  let x = 16;
  let buckets = new Array(x);
  let lf = 0.75;

  if (length() >= lf * x) {
    x = 2 * x;
  }

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  function set(key, value) {
    let index = hash(key) % x;
    let obj = { key: key, value: value };
    let list = LinkedList(obj);
    if (buckets[index] == undefined) {
      buckets[index] = list;
    } else if (buckets[index].head().value.value !== value) {
      buckets[index] = list;
    } else if (buckets[index].head().value.key !== key) {
      buckets[index].append(list);
    }
  }

  function get(key) {
    let index = hash(key) % x;
    if (!buckets[index]) return null;
    else if (buckets[index]) {
      let head = buckets[index].head();
      console.log(head);
      while (head) {
        if (head.value.key == key) return head.value.value;
        head = head.next;
      }
    }
  }

  function has(key) {
    let index = hash(key) % x;
    return buckets[index] != undefined;
  }

  function remove(key) {
    if (has(key)) {
      let index = hash(key) % x;
      let head = buckets[index].head();
      while (head) {
        if (head.value.key == key) {
          buckets[index].removeAt(0, head);
        }
        head = head.next;
      }
      return true;
    } else return false;
  }

  function length() {
    let count = 0;
    for (let i of buckets) {
      if (buckets[i]) {
        let head = buckets[i].head();
        count += buckets[i].sizeUp(head);
      }
    }
    return count;
  }

  function clear() {
    buckets = new Array(x);
  }

  function keys() {
    let array = [];
    for (let i of buckets.length) {
      let head = buckets[i].head();
      while (head) {
        array.push(head.value.key);
        head = head.next;
      }
    }
    return array;
  }

  function values() {
    let array = [];
    for (let i of buckets) {
      let head = buckets[i].head();
      while (head) {
        array.push(head.value.value);
        head = head.next;
      }
    }
    return array;
  }

  function entries() {
    let array = [];
    for (let i of buckets) {
      let head = buckets[i].head();
      while (head) {
        array.push([head.value.key, head.value.value]);
        head = head.next;
      }
    }
    return array;
  }

  return { hash, set, get, has, remove, length, clear, keys, values, entries };
}

const test = HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set('moon', 'silver')
test.set('moon', 'red')

console.log(test.get("moon"));
