import { LinkedList } from "../../src/behavior";

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

            linked.add(rndList[0]);
            linked.add(rndList[1]);
            linked.add(rndList[2]);

            expect(linked.head?.value).toBe(rndList[0]);
            expect(linked.tail?.value).toBe(rndList[2]);

            expect(linked.length).toBe(3);

            const simpledList = linked.collect()?.map((node, idx) => {
                expect(node.value).toBe(rndList[idx]);
                return node.value;
            });

            expect(simpledList).toStrictEqual(rndList);
        });

        it("Testing linked list iterator", () => {
            const rndList = [
                generateNumber(),
                generateNumber(),
                generateNumber(),
            ];
            const linked = new LinkedList<number>();

            linked.add(rndList[0]);
            linked.add(rndList[1]);
            linked.add(rndList[2]);

            let value = linked.next();
            expect(value?.value).toBe(rndList[0]);
            value = linked.next();
            expect(value?.value).toBe(rndList[1]);
            value = linked.next();
            expect(value?.value).toBe(rndList[2]);
            value = linked.next();
            expect(value).toBeUndefined();

            linked.rewind();

            value = linked.next();
            expect(value?.value).toBe(rndList[0]);
        });

        it("Testing linked list iterator with empty list", () => {
            const linked = new LinkedList<number>();
            expect(linked.collect()).toBeNull();
            expect(() => linked.next()).toThrowError("List is empty");
        });
    });
});
