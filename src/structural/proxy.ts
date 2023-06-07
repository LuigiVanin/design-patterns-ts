import { LocalStorageSingleton } from "../creational/index";

interface LocalStorageProxy<T> {
    getItem: (key: string) => T | null;

    setItem: (key: string, value: T) => void;

    removeItem: (key: string) => void;
}

export class SerializedLocalStorageProxy<T extends object>
    implements LocalStorageProxy<T>
{
    private localStorage: LocalStorageSingleton;

    constructor() {
        this.localStorage = new LocalStorageSingleton();
    }

    getItem(key: string): T | null {
        const value = this.localStorage.getItem(key);
        if (!value) return null;

        return JSON.parse(value) as T;
    }

    setItem(key: string, value: T) {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string): void {
        this.localStorage.removeItem(key);
    }
}

interface User {
    name: string;
    email: string;
    avatar: string;
}

export class UserStorage extends SerializedLocalStorageProxy<User> {
    private static readonly globalKey: Readonly<string> = "user-key";
    private _key: string;

    constructor(key = UserStorage.globalKey) {
        super();
        this._key = key;
    }

    get user(): User | null {
        return this.getItem(this._key);
    }

    set user(user: User | null) {
        if (!user) throw Error("It cant be Null");
        this.setItem(this._key, user);
    }

    removeUser(): void {
        this.removeItem(this._key);
    }
}
