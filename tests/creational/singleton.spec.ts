import { LocalStorageSingleton } from "../../src/creational";

describe("Creational Patterns --Singleton--", () => {
    describe("Singleton Patterns", () => {
        it("should correctly return the instances types", () => {
            const localStorage = LocalStorageSingleton.getInstance();

            expect(localStorage).toBeInstanceOf(LocalStorageSingleton);
            expect(localStorage.getStorage()).toBeInstanceOf(Object);

            const localStorage2 = LocalStorageSingleton.getInstance();

            expect(localStorage2).toBeInstanceOf(LocalStorageSingleton);

            expect(localStorage).toBe(localStorage2);
        });

        it("should correctly set and get items", () => {
            const localStorage = LocalStorageSingleton.getInstance();

            localStorage.setItem("test", "test");
            expect(localStorage.getItem("test")).toBe("test");

            localStorage.setItem("test", "test2");
            expect(localStorage.getItem("test")).toBe("test2");

            localStorage.removeItem("test");
            expect(localStorage.getItem("test")).toBeUndefined();

            localStorage.setItem("test", "test");
            expect(localStorage.getItem("test")).toBe("test");

            localStorage.setItem("test2", "test2");
            expect(localStorage.getItem("test2")).toBe("test2");

            localStorage.removeItem("test");
            localStorage.removeItem("test2");

            expect(localStorage.getItem("test")).toBeUndefined();
            expect(localStorage.getItem("test2")).toBeUndefined();

            expect(localStorage.getStorage()).toStrictEqual({});
        });

        it("should have the same storage on two different storages", () => {
            const localStorage1 = LocalStorageSingleton.getInstance();
            const localStorage2 = LocalStorageSingleton.getInstance();

            localStorage1.setItem("test", "test");
            expect(localStorage2.getItem("test")).toBe("test");

            localStorage2.setItem("test2", "test2");
            expect(localStorage1.getItem("test2")).toBe("test2");

            expect(localStorage1.getStorage()).toStrictEqual(
                localStorage2.getStorage()
            );
        });
    });
});
