import { SerializedLocalStorageProxy } from "./proxy";

interface UserData {
    id: string;
    username: string;
    password: string;
    email: string;
}

class SerializedLocalStorage<
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

class AsyncUserRequest {
    send() {
        return {
            data: {
                email: "luisfvanin@gmail.com",
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

    constructor(wrappee: AsyncUserRequest) {
        this.wrappee = wrappee;
    }

    startRequest() {
        this.loading = true;
        this.error = null;
    }

    finishRequest() {
        try {
            this.state = this.wrappee.send().data;
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
            const data = this.wrappee.send().data;
            this.storage.updateItem(data);
        } catch (err) {
            this.error = err;
        }
    }
}
