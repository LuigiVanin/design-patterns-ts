import {
    AsyncUserRequest,
    RequestLocalStorageDecorator,
    RequestStateDecorator,
    SerializedLocalStorage,
    UserData,
} from "../../src/structural/decorator";

describe("Behavioral Patterns", () => {
    describe("Template Method Pattern", () => {
        it("Testing instanciating request class with state decorator", () => {
            const stateRequest = new RequestStateDecorator(
                new AsyncUserRequest()
            );

            expect(stateRequest.error).toBeNull();
            expect(stateRequest.state).toBeNull();
            expect(stateRequest.loading).toBe(false);
            stateRequest.startRequest();
            expect(stateRequest.loading).toBe(true);
            expect(stateRequest.error).toBeNull();

            stateRequest.finishRequest();

            expect(stateRequest.loading).toBe(false);
            expect(stateRequest.error).not.toBeNull();
            expect(stateRequest.error.code).toBe("missing-email");
            expect(stateRequest.state).toBeNull();

            const stateRequest2 = new RequestStateDecorator(
                new AsyncUserRequest()
            );
            const email = "luisfvanin2@gmail.com";
            stateRequest2.setUserEmail(email);

            stateRequest2.startRequest();
            stateRequest2.finishRequest();

            expect(stateRequest2.loading).toBe(false);
            expect(stateRequest2.error).toBeNull();
            expect(stateRequest2.state).not.toBeNull();
            expect(stateRequest2.state?.email).toBe(email);

            const response = new AsyncUserRequest().send(email);

            expect(response.data.email).toBe(stateRequest2.state?.email);
        });
    });

    it("Testing instanciating request class with local storage decorator", () => {
        const localStorageKey = "user-data";

        const localStorage = new SerializedLocalStorage<UserData>(
            localStorageKey
        );

        expect(localStorage.getItem()).toBeNull();

        const localStorageRequest = new RequestLocalStorageDecorator(
            new AsyncUserRequest(),
            localStorageKey
        );

        localStorageRequest.startRequest();
        localStorageRequest.finishRequest();

        expect(localStorage.getItem()).not.toBeNull();
        expect(localStorage.getItem()?.email).toBe(
            "localstorageemail@gmail.com"
        );
        expect(localStorage.getItem()).toStrictEqual(
            localStorageRequest.storage.getItem()
        );
    });

    it("Testing two decorators with the same wrappee AsyncRequest class", () => {
        const localStorageKey = "user-data";

        const localStorage = new SerializedLocalStorage<UserData>(
            localStorageKey
        );

        const sameAsyncFunction = new AsyncUserRequest();

        const localStorageRequest = new RequestLocalStorageDecorator(
            sameAsyncFunction,
            localStorageKey
        );

        const stateRequest = new RequestStateDecorator(sameAsyncFunction);

        localStorageRequest.startRequest();
        localStorageRequest.finishRequest();

        stateRequest.setUserEmail("luisfvanin@gmail.com");
        stateRequest.startRequest();
        stateRequest.finishRequest();

        expect(localStorage.getItem()?.email).toBe(
            "localstorageemail@gmail.com"
        );

        expect(localStorage.getItem()).not.toStrictEqual(stateRequest.state);
    });
});
