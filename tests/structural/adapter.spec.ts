import { Circle, Coordinates } from "../../src/structural";
import {
    CentimeterAdapter,
    Converter,
    FeetAdapter,
    MeterAdapter,
    MillimeterAdapter,
} from "../../src/structural/adapter";

describe("Structural Patterns --Adapter--", () => {
    describe("Structural Patterns", () => {
        it("Creating Adapter nodes", () => {
            const randomX = Math.floor(Math.random() * 100);
            const randomY = Math.floor(Math.random() * 100);

            const coordinate: Coordinates = {
                x: randomX,
                y: randomY,
            };

            expect(coordinate).toStrictEqual({ x: randomX, y: randomY });
            const centAdapter = new CentimeterAdapter();
            expect(centAdapter.convertUnit(coordinate)).toStrictEqual({
                x: randomX,
                y: randomY,
            });
            const milliAdapter = new MillimeterAdapter();
            expect(milliAdapter.convertUnit(coordinate)).toStrictEqual({
                x: randomX * 10,
                y: randomY * 10,
            });

            const meterAdapter = new MeterAdapter();
            expect(meterAdapter.convertUnit(coordinate)).toStrictEqual({
                x: randomX / 100,
                y: randomY / 100,
            });

            const feetAdapter = new FeetAdapter();
            expect(feetAdapter.convertUnit(coordinate)).toStrictEqual({
                x: randomX * 30.48,
                y: randomY * 30.48,
            });
        });

        it("Testing converter", () => {
            const converter = new Converter(new CentimeterAdapter());

            const randomX = Math.floor(Math.random() * 100);
            const randomY = Math.floor(Math.random() * 100);

            const circle = new Circle({ x: randomX, y: randomY }, 5);
            const circleCoords = circle.draw();

            const convertedCircleCoord = converter.execute(circleCoords);

            expect(convertedCircleCoord.length).toBe(circleCoords.length);

            convertedCircleCoord.forEach((coord, index) => {
                expect(coord.x).toBe(circleCoords[index].x);
                expect(coord.y).toBe(circleCoords[index].y);
            });

            const converter2 = new Converter(new FeetAdapter());

            const convertedCircleCoord2 = converter2.execute(circleCoords);

            expect(convertedCircleCoord2.length).toBe(circleCoords.length);

            convertedCircleCoord2.forEach((coord, index) => {
                expect(coord.x).toBe(circleCoords[index].x * 30.48);
                expect(coord.y).toBe(circleCoords[index].y * 30.48);
            });

            const converter3 = new Converter(new MeterAdapter());

            const convertedCircleCoord3 = converter3.execute(circleCoords);

            expect(convertedCircleCoord3.length).toBe(circleCoords.length);

            convertedCircleCoord3.forEach((coord, index) => {
                expect(coord.x).toBe(circleCoords[index].x / 100);
                expect(coord.y).toBe(circleCoords[index].y / 100);
            });

            const converter4 = new Converter(new MillimeterAdapter());

            const convertedCircleCoord4 = converter4.execute(circleCoords);

            expect(convertedCircleCoord4.length).toBe(circleCoords.length);

            convertedCircleCoord4.forEach((coord, index) => {
                expect(coord.x).toBe(circleCoords[index].x * 10);
                expect(coord.y).toBe(circleCoords[index].y * 10);
            });
        });
    });
});
