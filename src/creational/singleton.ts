export class LocalStorageSingleton {
    private storage: Record<string, string> = {};
    private static _instance: LocalStorageSingleton;

    private contructor() {}

    public static getInstance(): LocalStorageSingleton {
        if (!LocalStorageSingleton._instance) {
            LocalStorageSingleton._instance = new LocalStorageSingleton();
        }
        return LocalStorageSingleton._instance;
    }

    getStorage() {
        return this.storage;
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
