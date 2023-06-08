import { LinkedList, LinkedListIterator } from "../../src/behavior";

const generateNumber = () => {
    return Math.floor(Math.random() * 100);
};

describe("Behavioral Patterns --Iterator--", () => {
    describe("Iterator Patterns", () => {
        it("Testing linked list implementation", () => {
            const rndList = [
                generateNumber(),
                generateNumber(),
                generateNumber(),
            ];
            const linked = new LinkedList<number>();

            linked.push(rndList[0]);
            linked.push(rndList[1]);
            linked.push(rndList[2]);

            expect(linked.head?.value).toBe(rndList[0]);
            expect(linked.tail?.value).toBe(rndList[2]);

            expect(linked.length).toBe(3);

            const simpledList = linked.getIterator().collect();

            expect(simpledList).toStrictEqual(rndList);

            const node = linked.pop();
            expect(node?.value).toBe(rndList.at(-1));

            expect(linked.length).toBe(2);

            expect(linked.tail?.value).toBe(rndList[1]);
        });

        it("Testing linked list iterator", () => {
            const linkedlist = new LinkedList<number>();
            const rndList = [
                generateNumber(),
                generateNumber(),
                generateNumber(),
            ];
            let iterator = linkedlist.getIterator();

            expect(iterator).toBeInstanceOf(LinkedListIterator);
            expect(iterator.collect()).toStrictEqual([]);

            linkedlist.push(rndList[0]);
            linkedlist.push(rndList[1]);
            linkedlist.push(rndList[2]);

            expect(iterator.collect()).toStrictEqual(rndList);

            iterator = linkedlist.getIterator();
            expect(iterator.next()).toBe(rndList[0]);
            expect(iterator.next()).toBe(rndList[1]);
            expect(iterator.next()).toBe(rndList[2]);
            expect(iterator.next()).toBeUndefined();

            iterator.rewind();

            for (let i = 0; i < rndList.length; i++) {
                expect(iterator.next()).toBe(rndList[i]);
            }
            expect(iterator.next()).toBeUndefined();
        });

        it("Testing linked list iterator with empty list", () => {
            const linked = new LinkedList<number>();
            expect(linked.getIterator().collect()).toStrictEqual([]);
            expect(() => linked.getIterator().next()).toThrowError(
                "List is empty"
            );
        });
    });
});
