# Singly Linked Lists In JavaScript!

## What is a Linked List?

How do we store data in JavaScript? _Arrays_ and _objects_ a couple examples of the core data structures we commonly use. Then we have things like the DOM which is stored in a _tree_ data structure, or the call stack which, as the name implies, is a _stack_. Well today I would like to introduce the _linked list_ data structure. What exactly is a linked list? Check out this definition on Wikipedia:

> In computer science, a linked list is a linear collection of data elements, whos order is not given by their physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a collection of nodes which together represent a sequence. In its most basic form, each node contains: data, and a reference (in other words, a _link_ to the next node in the sequence).

As we see, linked lists are simple by nature, as most basic data structures are. All we need is some data (could be of any core JavaScript data type) and a pointer that points to the next node. Here is a simple diagram to help visualize this concept:

![Linked List Diagram]()

Here I would like to point out that we are specifically talking about a _singly_ linked list. Not to be confused with its close cousin, a singly linked list contains one pointer to the next node. Doubly linked lists have a pointer to the next node as well as the previous node, but this is beyond our scope today. What exactly does this mean? It means we can only move from the _head_ of the list to the _tail_. We will discover what this means for us as far as code goes in a bit.

## What's wrong with arrays?

As cool as linked lists are, they aren't supposed to take over from arrays. In fact, the only similarity between linked lists and arrays is that they store data sequentially. As we will see, linked lists have some great qualities that make them the perfect solutions to certain problems. Overall, especially as JavaScript devs, we will use arrays much more often. There are plenty of benefits to an array that linked lists just don't have. Because linked lists store data using pointers to the next element, we simply can't just grab an element out of a linked list like we would an array:

```js
const toys = ['Woody', 'Buzz Lightyear', 'Mr. Potato Head', 'Jesse'];
```

If we have an array like the example above and needed to grab Buzz Lightyear, how could we do it? Well if we know what the index that Buzz Lightyear was stored we could use `toys[1]`. This type of lookup is **fast**. What other method could we use to find Buzz? Well if we weren't sure where he was being stored we might have to implement something like this:

```js
const findToy = (toys, toyName) => {
  for (const toy of toys) {
    if (toy === toyName) return toy;
  }
  return undefined;
};
```

This method is much slower that being able to access by the index, not to mention it requires a lot more code! Well, since linked lists don't have an index, we are going to have to rely on similar code to look items up like this. Another property of arrays that make them an excellent data structure is that when we compare them to linked lists, they generally take up less memory. Now this might not be as much of a concern for us as JavaScript developers, but it is important to note that linked lists need to store a reference to the next element which isn't necessary for elements in an array.

## Why linked lists then?

There is one key area that linked lists reign supreme: insertions and deletions. Lets look at some common insertion and deletion methods that we use all the time with arrays:

To insert and delete elements at the end of an array we would probably use these methods:

- [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

  > "The `push()` method adds one or more elements to the end of an array and returns the new length of the array."
  >
  > -MDN

- [pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

  > "The `pop()` method removes the last element from an array and returns that element. This method changes the length of the array."
  >
  > -MDN

To insert and delete elements at the beginning of an array, these methods come in handy:

- [shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

  > "The `shift()` method removes the first element from an array and returns that removed element. This method changes the length of the array."
  >
  > -MDN

- [unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

  > "The `unshift()` method adds one or more elements to the beginning of an array and returns the new lengthof the array."
  >
  > -MDN

What if we want to insert or delete from the middle of the array? For this JavaScript gives us the splice method:

- [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

  > "The `splice()` method changes the contents of an array by removing or replacing existing elements and/or adding new elements _in place_"
  >
  > -MDN

Because arrays by nature are indexed, some of these methods are better than others. If we need simply need to add an element to the array and it doesn't need to be at the start, it would be a good idea to use the `push()` method. Why? By deleting or adding to the end of the array, the indices of the other elements are not effected. However, when we try to add or remove something from anywhere else it means that all the elements that come after now have to be reindexed to match the changes. `shift()` and `unshift()` are the biggest culprit for this because **all** the elements of the array now have to be changed. In a small dataset, this is neglible. But as our array grows in size, so does the time it takes to do all this work to change the indices of the array. If we are talking Big O notation, these methods (besides `push()` and `pop()`) will have O(n) performance.

Contrast this with a linked list which has O(1) or constant time insertion and deletion. Why is this? As we will see with the code, when inserting or deleting a node in a linked list, we simply have to get to that node, and then shuffle some pointers around. If you want to see this in action [visualgo](https://visualgo.net/en/list) has a great visualization tool that can help you see exactly how this works. Don't worry, we will see the code later.

## Lets Make a Singly Linked List!

To make a singly linked list I will be using the es6 JavaScript classes. Lets first start with by making a node. Remember, a node consists of a piece of data, and a pointer to the next node:

```js
class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.pointer = null;
  }
}
```

This is all we need for a node!

Next up we need our list. If you recall from before, a linked list has a head and a tail. Also, for convenience sake, we will keep track of the length of our list. We could implement our structure like this:

```js
class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
}
```

Why do I initialize the head and tail to be `null`? That's because if our list is empty, we don't actually have a head or tail.

Okay cool, now that we have our node class and our list class, lets write some methods to help us manipulate our list. I will be focusing on the basic operations we use on arrays and how we can implement them with our linked list.

### Push and Pop

The first method we will implement is `push()`. This will be easy for us to create. Like our `push()` array method, this should add a new node to the end of our list. What if the list is empty? If we are pushing the first node into our list, then our `push` method should set the head and the tail to be our new node. We could implement this method like this:

```js
class SinglyLinkedList {
  // code above

  push(data) {
    // create a new node
    const newNode = new LinkedListNode(data);
    // check if head is null. If it is, set the head and tail to our new node
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.pointer = newNode;
      this.tail = newNode;
    }
    // don't forget to increment length
    this.length++;
    return this.length;
  }
}
```

That doesn't seem so bad! What about `pop()`? Well it turns out this method won't be quite as simple as `push()`. Lets take a look:

```js
class SinglyLinkedList {
  // code above

  pop() {
    // if our list is empty, return undefined.
    if (!this.head) return undefined;
    // if we only have one item in the list,
    // just return that item and set the head and tail to null
    if (this.length === 1) {
      const node = this.head;
      this.head = this.tail = null;
      this.length--;
      return node;
    }
    // Now comes the tricky part...
    let current = this.head;
    let prev = current;
    // We want to loop through the list until
    // we hit the tail which has pointer set to null
    while (current.pointer) {
      prev = current;
      current = current.pointer;
    }
    // Here is the pointer trade off.
    this.tail = prev;
    this.tail.pointer = null;
    this.length--;
    return current;
  }
}
```

The bulk of the logic for `pop()` comes after our first two `if` statements. This can be hard to see at first, but basically we have to keep track of two nodes at all times. We keep track of the current node we are at and the previous node. Our `while` loop takes us to the end of the list. Once we make it to the end we simply set the tail of the list to be our previoius node (2nd from the end in this case) and set the pointer of that node to be null. When we set the pointer to `null` we sever the link to our last node thereby deleting it from the list.

Next on our 'list' of methods (see what I did there?) is `shift()` and `unshift()`

### Shift and Unshift

Here we will really see the utility of linked lists. Our `shift()` and `unshift()` methods will be nice and easy!

```js
class SinglyLinkedList {
  // code above

  shift() {
    if (!this.head) return undefined;
    const head = this.head;
    // set head to be the node that head points to
    this.head = head.pointer;
    this.length--;
    // if this is the last element in the list
    // we need to set the tail to be null
    if (this.length === 0) {
      this.tail = null;
    }
    return head;
  }

  unshift(data) {
    const newHead = new LinkedListNode(data);
    // if we are adding the first node we should set
    // the tail to be the same node as the head
    if (!this.head) {
      this.tail = newHead;
    }
    // simply set the new head and forget it!
    newHead.pointer = this.head;
    this.head = newHead;
    this.length++;
    return this.length;
  }
}
```

Pretty simple right? And much faster than using the same methods on an array! Our linked list is coming along nicely, but it would be nice to access all these items we can add and delete. Since we can access elements by index in an array, let's try to implement this with our linked list!

### getByIndex

```js
class SinglyLinkedList {
  // code above

  getByIndex(index) {
    // if the index is out of range for our list we will return undefined
    if (index < 0 || index >= this.length) return undefined;
    let counter = 0;
    let node = this.head;
    // loop through the list until we get to the index we need
    while (index !== counter) {
      node = node.pointer;
      counter++;
    }
    return node;
  }
}
```

Unfortunately we are back to looping through all our nodes until we match the index. Since our nodes don't actually have an index we have to implement a counter to keep track of where we are in the list. This is a far cry from simply looking up by index, but we we will make due! Now we are missing one core piece of functionality in our list: `splice()`

### Insert and Delete

On arrays we have `splice()` which can delete and insert items! This is pretty complex so instead lets break ours into two separate methods. First lets insert into our list! Lets take a look at this diagram to help us visualize what has to happen here:

![insert into linked list diagram]()

In order to insert into our list we need to set the pointer of the previous node to our new node and then have our new node point to node that used to live where we are inserting. We will make use of the methods we defined earlier to help us implement inserting and deleting. Our `insert()` method will take and index and the data we want to store at that index. It could look something like this:

```js
class SinglyLinkedList {
  // code above

  insert(index, data) {
    switch (true) {
      case index < 0 || index > this.length:
        return;
      case index === 0:
        return this.unshift(data);
      case index === this.length:
        return this.push(data);
      default:
        const newNode = new ExampleNode(data);
        const preNode = this.getByIndex(index - 1);
        const postNode = preNode.pointer;
        // Here comes the pointer switch-a-roo
        preNode.pointer = newNode;
        newNode.pointer = postNode;
        this.length++;
        return this.length;
    }
  }
}
```

Our default action here has some interesting logic. Lets break it down:

1. create a new node as `newNode`
1. get the node before the index we want to insert into and set it as `preNode`
1. get the node we are going to take the place of and set it as `postNode`
1. next we set the `preNode` to point to our `newNode`
1. lastly we set our `newNode` to point to the `postNode`

Pretty cool right?

What about deleting? Let's try it. All we will need is an index to delete at! Let's take a look at another diagram first:

![removing from linked list]()

This is even easier than inserting. All we have to do is take our previous node and point it to the node that comes after the element we are removing.

```js
class SinglyLinkedList {
  // code above
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
        // Here comes the pointer switch-a-roo
        preNode.pointer = node.pointer;
        this.length--;
        return node;
    }
  }
}
```

All we need to do here is set the pointer of the node previous to our index to the node that comes after the node at the index we specify.

We can use our methods like this:

```js
const list = new SinglyLinkedList();

list.push('First Node!');
list.pop(); // this will return our first node object
list.unshift('Second Node!');
list.shift(); // this will return our second node object
list.unshift('First Node!');
list.unshift('Second Node!');
list.unshift('Third Node!');
list.insert(1, "I'm the new second!");
list.remove(2); // this will return our second node object
```

## Conclusion

Hopefully this has been a good introduction to linked lists and some of the basic implementations of them in JavaScript! As we can see linked lists are a great data structure to be familiar with. They are especially great for inserting and deleting elements. The complete code for this article can be found at [this gist](https://gist.github.com/rancewcampbell/3ac11705f6832827de87e7ff8115020e) Thanks for reading and see you next time!

## Resources:

[Linked List Diagram](https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2013/03/Linkedlist.png)

[Computer science in JavaScript: Linked list](https://humanwhocodes.com/blog/2019/01/computer-science-in-javascript-linked-list/)

[Wikipedia: Linked List](https://en.wikipedia.org/wiki/Linked_list)

[Visualgo](https://visualgo.net/en/list)
