export interface Observer<T> {
    update: (data: T) => void;
}

export interface Subject<T> {
    subscribe: (observer: Observer<T>) => void;
    unsubscribe: (observer: Observer<T>) => void;
    notify: (data: T) => void;
}

export class TemperatureSensor implements Subject<number> {
    observers: Observer<number>[] = [];

    subscribe(observer: Observer<number>): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer<number>): void {
        const observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    }

    notify(data: number): void {
        this.observers.forEach((observer) => observer.update(data));
    }

    mesureTemperature(temp: number): void {
        this.notify(temp);
    }
}

export class TemperatureDisplay implements Observer<number> {
    private currentTemperature: number = 0;

    update(data: number) {
        this.currentTemperature = data;
    }

    getCurrentTemperature(): number {
        return this.currentTemperature;
    }

    display() {
        console.log(`Current temperature: ${this.currentTemperature}`);
    }
}

// const temperatureSensor = new TemperatureSensor();
// const temperatureDisplay = new TemperatureDisplay();

// temperatureSensor.subscribe(temperatureDisplay);
// temperatureSensor.mesureTemperature(20);
// temperatureDisplay.display();
// temperatureSensor.mesureTemperature(30);
// temperatureDisplay.display();
// temperatureSensor.unsubscribe(temperatureDisplay);
// temperatureSensor.mesureTemperature(40);
// temperatureDisplay.display();
