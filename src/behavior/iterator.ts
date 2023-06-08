export interface IteratorProtocol<T> {
    next(): T | undefined;
    rewind(): void;
    collect(): Array<T> | null;
}

export class LinkedNode<T> {
    next: LinkedNode<T> | null;
    value: T;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList<T> implements IteratorProtocol<LinkedNode<T>> {
    public head: LinkedNode<T> | null;
    public tail: LinkedNode<T> | null;
    private currentNode: LinkedNode<T> | null;
    public length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.currentNode = null;
    }

    navigate(callback: (node: LinkedNode<T>) => void) {
        let node = this.head;
        while (node !== null) {
            callback(node);
            node = node.next;
        }
    }

    add(value: T) {
        let Linkednode = new LinkedNode<T>(value);
        if (this.head === null) {
            this.head = Linkednode;
            this.tail = Linkednode;
        } else {
            if (!this.tail) throw new Error("Tail is null");
            this.tail.next = Linkednode;
            this.tail = Linkednode;
        }
        this.length++;
    }

    rewind(): void {
        this.currentNode = null;
    }

    next(): LinkedNode<T> | undefined {
        if (!this.head) throw new Error("List is empty");
        if (!this.currentNode) {
            this.currentNode = this.head;
            return this.currentNode;
        }
        if (this.currentNode.next === null) {
            this.rewind();
            return undefined;
        }
        this.currentNode = this.currentNode.next;
        return this.currentNode as LinkedNode<T>;
    }

    collect() {
        if (!this.head && !this.tail) return null;
        let list: Array<LinkedNode<T>> = [];
        this.navigate((node) => list.push(node));
        return list;
    }
}

// let list = new LinkedList<number>();
// list.add(1);
// list.add(2);
// list.add(3);
// list.add(4);

// while (list.next() !== undefined) {
//     console.log(list.next()?.value);
// }
