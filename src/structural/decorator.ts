import { SerializedLocalStorageProxy } from "./proxy";

export interface UserData {
    id: string;
    username: string;
    password: string;
    email: string;
}

export class SerializedLocalStorage<
    T extends object
> extends SerializedLocalStorageProxy<T> {
    private key: string;

    constructor(key: string) {
        super();
        this.key = key;
    }

    getItem(): T | null {
        return super.getItem(this.key);
    }

    updateItem(value: T): void {
        return super.setItem(this.key, value);
    }
}

export class AsyncUserRequest {
    constructor() {}

    send(email?: string) {
        if (!email)
            throw {
                code: "missing-email",
                message: "You forgot to add an email to the request body",
            };
        return {
            data: {
                email,
                id: "21",
                password: "123456",
                username: "LuisVanin",
            } as UserData,
        };
    }
}

interface BaseDecorator<T> {
    wrappee: T;
}

export class RequestStateDecorator implements BaseDecorator<AsyncUserRequest> {
    wrappee: AsyncUserRequest;
    loading = false;
    error: any = null;
    state: UserData | null = null;

    private userEmail: string | undefined = undefined;

    constructor(wrappee: AsyncUserRequest) {
        this.wrappee = wrappee;
    }

    setUserEmail(email: string) {
        this.userEmail = email;
    }

    startRequest() {
        this.loading = true;
        this.error = null;
    }

    finishRequest() {
        try {
            this.state = this.wrappee.send(this.userEmail).data;
        } catch (err) {
            this.error = err;
        } finally {
            this.loading = false;
        }
    }
}

export class RequestLocalStorageDecorator
    implements BaseDecorator<AsyncUserRequest>
{
    wrappee: AsyncUserRequest;
    storage: SerializedLocalStorage<UserData>;
    error: any = null;
    private key: string;

    constructor(wrappee: AsyncUserRequest, key: string) {
        this.wrappee = wrappee;
        this.key = key;
        this.storage = new SerializedLocalStorage<UserData>(this.key);
    }

    startRequest() {
        this.error = null;
    }

    finishRequest() {
        try {
            const data = this.wrappee.send("localstorageemail@gmail.com").data;
            this.storage.updateItem(data);
        } catch (err) {
            this.error = err;
        }
    }
}
