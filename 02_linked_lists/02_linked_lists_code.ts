class LinkedListNode {
  data: any;
  pointer: LinkedListNode | null;

  constructor(data: unknown) {
    this.data = data;
    this.pointer = null;
  }
}

class SinglyLinkedList {
  length: number;
  head: LinkedListNode | null;
  tail: LinkedListNode | null;

  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(data: any) {
    const newNode = new LinkedListNode(data);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.pointer = newNode;
      }
      this.tail = newNode;
    }
    this.length++;
    return this.length;
  }

  pop() {
    if (!this.head) return;
    if (this.length === 1) {
      const node = this.head;
      this.head = this.tail = null;
      this.length--;
      return node;
    }
    let current = this.head;
    let next = current;
    while (current.pointer) {
      next = current;
      current = current.pointer;
    }
    this.tail = next;
    this.tail.pointer = null;
    this.length--;
    return current;
  }

  shift() {
    if (!this.head) return;
    const head = this.head;
    this.head = head.pointer;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return head;
  }

  unshift(data: any) {
    const newHead = new LinkedListNode(data);
    if (!this.head) {
      this.tail = newHead;
    }
    newHead.pointer = this.head;
    this.head = newHead;
    this.length++;
    return this.length;
  }

  getByIndex(index: number) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0)
      return this.head instanceof LinkedListNode ? this.head : undefined;
    if (index === this.length - 1)
      return this.tail instanceof LinkedListNode ? this.tail : undefined;
    let counter = 0;
    let node = this.head;
    while (index !== counter) {
      if (node) {
        node = node.pointer;
      }
      counter++;
    }
    return node as LinkedListNode;
  }

  setByIndex(index: number, data: any) {
    const node = this.getByIndex(index);
    if (node) {
      node.data = data;
      return node;
    }
    return;
  }

  insert(index: number, data: any) {
    switch (true) {
      case index < 0 || index > this.length:
        return;
      case index === 0:
        return this.unshift(data);
      case index === this.length:
        return this.push(data);
      default:
        const newNode = new LinkedListNode(data);
        const preNode = this.getByIndex(index - 1)!;
        const postNode = preNode.pointer;
        preNode.pointer = newNode;
        newNode.pointer = postNode;
        this.length++;
        return this.length;
    }
  }

  remove(index: number) {
    switch (true) {
      case index < 0 || index >= this.length:
        return;
      case index === 0:
        return this.shift();
      case index === this.length - 1:
        return this.pop();
      default:
        const preNode = this.getByIndex(index - 1)!;
        const node = preNode.pointer;
        preNode.pointer = node ? node.pointer : null;
        this.length--;
        return node as LinkedListNode;
    }
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next: LinkedListNode | null;
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

const list = new SinglyLinkedList();

list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
list.push(6);
list.push(7);
