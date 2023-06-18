import {
    SerializedLocalStorageProxy,
    User,
} from "./../../src/structural/proxy";
import { LocalStorageSingleton } from "./../../src/creational/singleton";
import { UserStorage } from "../../src/structural/proxy";
import { expectTypeOf } from "vitest";

const CUSTOM_KEY = "custom_user_key";

describe("Behavioral Patterns --Iterator--", () => {
    beforeAll(() => {
        const localStorage = LocalStorageSingleton.getInstance();
        localStorage.setItem(CUSTOM_KEY, JSON.stringify(null));
    });

    describe("Proxy Patterns", () => {
        it("Testing user storage proxy that consistantly uses the same key", () => {
            const userProxy = new UserStorage(CUSTOM_KEY);
            expect(userProxy.user).toBeNull();
            const data = {
                name: "John Doe",
                email: "jonhdoe@cookie.com",
                avatar: "https://avatar.com/john",
            };
            userProxy.user = data;
            expect(userProxy.user).toStrictEqual(data);

            const data2 = {
                name: "Jane Doe",
                email: "janedoe@shark.gov",
                avatar: "https://avatar.com/jane",
            };

            userProxy.user = data2;

            expect(userProxy.user).toStrictEqual(data2);

            userProxy.removeUser();
            expect(userProxy.user).toBeNull();
        });

        it("Testing the SerializedLocalStorageProxy implementation using another key", () => {
            interface TestData {
                name: string;
                id: string;
            }
            let data: TestData = {
                name: "Will Smith",
                id: "123",
            };

            const proxyStorage = new SerializedLocalStorageProxy<TestData>();
            expect(proxyStorage.getItem("random-key")).toBeNull();
            proxyStorage.setItem("random-key", data);
            expect(proxyStorage.getItem("random-key")).toStrictEqual(data);
            expectTypeOf(
                proxyStorage.getItem("random-key")
            ).toEqualTypeOf<TestData | null>();

            data = {
                name: "Willow Smith",
                id: "321",
            };

            expect(proxyStorage.getItem("random-key-2")).toBeNull();
            proxyStorage.setItem("random-key-2", data);
            expect(proxyStorage.getItem("random-key-2")).toStrictEqual(data);
            expectTypeOf(
                proxyStorage.getItem("random-key-2")
            ).toEqualTypeOf<TestData | null>();

            expect(proxyStorage.getItem("random-key")).not.toStrictEqual(
                proxyStorage.getItem("random-key-2")
            );

            proxyStorage.removeItem("random-key");
            expect(proxyStorage.getItem("random-key")).toBeNull();
            expectTypeOf(
                proxyStorage.getItem("random-key")
            ).toEqualTypeOf<TestData | null>();

            expect(proxyStorage.getItem("random-key-2")).toStrictEqual(data);
        });

        it("Testing SerializedLocalStorageProxy and UserStorage where we will access user setted by UserStorage data through SerializedLocalStorageProxy", () => {
            const userProxy = new UserStorage(CUSTOM_KEY);
            expect(userProxy.user).toBeNull();
            let data: User = {
                name: "John Doe",
                email: "",
                avatar: "",
            };
            userProxy.user = data;
            expect(userProxy.user).toStrictEqual(data);

            const proxyStorage = new SerializedLocalStorageProxy<User>();
            expect(proxyStorage.getItem(CUSTOM_KEY)).toStrictEqual<User>(data);
            expectTypeOf(proxyStorage.getItem(CUSTOM_KEY)).toEqualTypeOf<
                typeof data | null
            >();
            expect(proxyStorage.getItem(CUSTOM_KEY)).toStrictEqual(
                userProxy.user
            );

            data = {
                name: "Jane Doe",
                email: "janecrooks@crooks.com",
                avatar: "123.png",
            };
            expect(proxyStorage.getItem("random-key")).toBeNull();
            proxyStorage.setItem("random-key", data);
            expect(proxyStorage.getItem("random-key")).toStrictEqual(data);
            expect(proxyStorage.getItem("random-key")).not.toStrictEqual(
                userProxy.user
            );
            expectTypeOf(
                proxyStorage.getItem("random-key")
            ).toEqualTypeOf<User | null>();
        });
    });
});
