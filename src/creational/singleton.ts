interface Singleton {
    getInstance(): Singleton;
}

export class LocalStorageSingleton implements Singleton {
    private storage: Record<string, string> = {};

    private static _instance: Singleton;

    contructor() {
        this.storage = {
            key: JSON.stringify({
                name: "John Doe",
                age: 30,
            }),
        };
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    getInstance(): Singleton {
        return LocalStorageSingleton._instance;
    }

    getItem(key: string) {
        return this.storage[key];
    }

    setItem(key: string, value: string) {
        this.storage[key] = value;
    }

    removeItem(key: string) {
        delete this.storage[key];
    }
}
