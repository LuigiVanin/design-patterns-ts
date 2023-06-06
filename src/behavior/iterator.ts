export interface IteratorProtocol<T> {
    next(): T | undefined;
    rewind(): void;
}

export class ListNode<T> {
    next: ListNode<T> | null;
    value: T;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList<T> implements IteratorProtocol<ListNode<T>> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    private currentNode: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
        this.currentNode = null;
    }

    navigate(callback: (node: ListNode<T>) => void) {
        let node = this.head;
        while (node !== null) {
            callback(node);
            node = node.next;
        }
    }

    add(value: T) {
        let listnode = new ListNode<T>(value);
        if (this.head === null) {
            this.head = listnode;
            this.tail = listnode;
        } else {
            this.navigate(
                (node) => node.next === null && (node.next = listnode)
            );
            this.tail = listnode;
        }
    }

    rewind(): void {
        this.currentNode = null;
    }

    next(): ListNode<T> | undefined {
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
        return this.currentNode as ListNode<T>;
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
