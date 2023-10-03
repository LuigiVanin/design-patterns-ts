import { Rectangle, Circle } from "../../src/creational/prototype";

describe("Creational Patterns", () => {
    describe("Prototype Pattern", () => {
        it("Testing cloning circle", () => {
            const circle = new Circle();
            circle.setRadius(10);
            circle.setCoordinates({ x: 10, y: 10 });

            const circleClone = circle.clone();

            expect(circleClone).toBeInstanceOf(Circle);
            expect(circleClone.getRadius()).toBe(circle.getRadius());
            expect(circleClone.getCoordinates()).toStrictEqual(
                circle.getCoordinates()
            );
        });

        it("Testing cloning rectangle", () => {
            const rectangle = new Rectangle();
            rectangle.setWidth(10);
            rectangle.setHeight(20);
            rectangle.setCoordinates({ x: 10, y: 10 });

            const rectangleClone = rectangle.clone();

            expect(rectangleClone).toBeInstanceOf(Rectangle);
            expect(rectangleClone.getWidth()).toBe(rectangle.getWidth());
        });
    });
});
