class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.pointer = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(data) {
    const newNode = new LinkedListNode(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.pointer = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this.length;
  }

  traverse(cur = this.head) {
    const current = cur;
    console.log(current.data);
    if (!current.pointer) return undefined;
    this.traverse(current.pointer);
  }

  pop() {
    if (!this.head) return undefined;
    if (this.length === 1) {
      const node = this.head;
      this.head = this.tail = null;
      this.length--;
      return node;
    }
    let current = this.head;
    let prev = current;
    while (current.pointer) {
      prev = current;
      current = current.pointer;
    }
    this.tail = prev;
    this.tail.pointer = null;
    this.length--;
    return current;
  }

  shift() {
    if (!this.head) return undefined;
    const head = this.head;
    this.head = head.pointer;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return head;
  }

  unshift(data) {
    const newHead = new LinkedListNode(data);
    if (!this.head) {
      this.tail = newHead;
    }
    newHead.pointer = this.head;
    this.head = newHead;
    this.length++;
    return this.length;
  }

  getByIndex(index) {
    if (index < 0 || index >= this.length) return undefined;
    let counter = 0;
    let node = this.head;
    while (index !== counter) {
      node = node.pointer;
      counter++;
    }
    return node;
  }

  setByIndex(index, data) {
    const node = this.getByIndex(index);
    if (node) {
      node.data = data;
      return node;
    }
    return undefined;
  }

  insert(index, data) {
    switch (true) {
      case index < 0 || index > this.length:
        return;
      case index === 0:
        return this.unshift(data);
      case index === this.length:
        return this.push(data);
      default:
        const newNode = new LinkedListNode(data);
        const preNode = this.getByIndex(index - 1);
        const postNode = preNode.pointer;
        preNode.pointer = newNode;
        newNode.pointer = postNode;
        this.length++;
        return this.length;
    }
  }

  remove(index) {
    switch (true) {
      case index < 0 || index >= this.length:
        return;
      case index === 0:
        return this.shift();
      case index === this.length - 1:
        return this.pop();
      default:
        const preNode = this.getByIndex(index - 1);
        const node = preNode.pointer;
        preNode.pointer = node.pointer;
        this.length--;
        return node;
    }
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    let prev = null;
    while (node) {
      next = node.pointer;
      node.pointer = prev;
      prev = node;
      node = next;
    }
    return this;
  }
}
