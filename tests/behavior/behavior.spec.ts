import { should } from "vitest";
import {
    TemperatureDisplay,
    TemperatureSensor,
} from "../../src/behavior/observer";

describe("Behavioral Patterns", () => {
    describe("Observer Patterns", () => {
        it("should update the display when the temperature changes", () => {
            const sensor = new TemperatureSensor();
            const display1 = new TemperatureDisplay();
            const display2 = new TemperatureDisplay();

            sensor.subscribe(display1);
            expect(sensor.observers).toHaveLength(1);
            sensor.subscribe(display2);
            expect(sensor.observers).toHaveLength(2);
            expect(1).toBe(1);
            expect(
                [
                    display1.getCurrentTemperature(),
                    display2.getCurrentTemperature(),
                ],
                "Getting default temperature"
            ).toSatisfy((temps: number[]) => temps.every((temp) => temp === 0));

            sensor.mesureTemperature(20);

            expect(
                [
                    display1.getCurrentTemperature(),
                    display2.getCurrentTemperature(),
                ],
                "Getting temperature after update"
            ).toSatisfy((temps: number[]) =>
                temps.every((temp) => temp === 20)
            );

            sensor.notify(30);

            expect(
                [
                    display1.getCurrentTemperature(),
                    display2.getCurrentTemperature(),
                ],
                "Getting temperature after notify"
            ).toSatisfy((temps: number[]) =>
                temps.every((temp) => temp === 30)
            );
        });

        it("should reduce observers when unsubscribing", () => {
            const sensor = new TemperatureSensor();
            const display1 = new TemperatureDisplay();
            const display2 = new TemperatureDisplay();

            sensor.subscribe(display1);
            expect(sensor.observers).toHaveLength(1);
            sensor.subscribe(display2);
            expect(sensor.observers).toHaveLength(2);

            sensor.unsubscribe(display1);

            expect(sensor.observers).toHaveLength(1);

            sensor.unsubscribe(display2);

            expect(sensor.observers).toHaveLength(0);
        });

        it("should change temperature when multiple subscribers", () => {
            const sensor = new TemperatureSensor();
            const displayList = Array.from({ length: 10 }, () => {
                return new TemperatureDisplay();
            });

            displayList.forEach((display) => sensor.subscribe(display));

            expect(sensor.observers).toHaveLength(10);

            sensor.notify(20);

            expect(
                displayList.map((display) => display.getCurrentTemperature())
            ).toSatisfy((temps: number[]) =>
                temps.every((temp) => temp === 20)
            );
        });
    });
});
