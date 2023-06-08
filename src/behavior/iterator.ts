export interface IteratorProtocol<T> {
    next(): T | undefined;
    rewind(): void;
    collect(): Array<T> | null;
}

interface IterableProtocol<T> {
    getIterator(): IteratorProtocol<T>;
}

export class LinkedNode<T> {
    next: LinkedNode<T> | null;
    value: T;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList<T> implements IterableProtocol<T> {
    public head: LinkedNode<T> | null;
    public tail: LinkedNode<T> | null;
    public length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value: T) {
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

    navigate(callback: (node: LinkedNode<T>) => void) {
        let node = this.head;
        while (node !== null) {
            callback(node);
            node = node.next;
        }
    }

    pop(): LinkedNode<T> | null {
        if (this.head === null) return null;
        let node = this.head;
        let prev = null;
        while (node.next !== null) {
            prev = node;
            node = node.next;
        }
        if (prev) prev.next = null;
        this.tail = prev;
        this.length--;
        return node;
    }

    getIterator(): IteratorProtocol<T> {
        return new LinkedListIterator(this);
    }
}

export class LinkedListIterator<T> implements IteratorProtocol<T> {
    private list: LinkedList<T>;
    private currentNode: LinkedNode<T> | null;

    constructor(list: LinkedList<T>) {
        this.list = list;
        this.currentNode = null;
    }

    next(): T | undefined {
        if (!this.list.head) throw new Error("List is empty");
        if (!this.currentNode) {
            this.currentNode = this.list.head;
            return this.currentNode.value;
        }
        if (this.currentNode.next === null) {
            this.rewind();
            return undefined;
        }
        this.currentNode = this.currentNode.next;
        return this.currentNode.value;
    }

    rewind(): void {
        this.currentNode = null;
    }

    collect(): Array<T> | null {
        if (!this.list.head && !this.list.tail) return [];
        let result: Array<T> = [];
        this.list.navigate((node) => {
            result.push(node.value);
        });
        return result;
    }
}
