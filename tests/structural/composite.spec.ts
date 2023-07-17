import { Rectangle } from "./../../src/structural/composite";
import {
    Circle,
    Component,
    Dot,
    CustomFigure,
} from "../../src/structural/composite";

describe("Structural Patterns --Composite--", () => {
    describe("Structural Patterns", () => {
        const dot = new Dot({ x: 0, y: 0 });
        const circle = new Circle({ x: 1, y: 1 }, 5);
        const rectangle = new Rectangle({ x: 5, y: 5 }, 20, 50);
        const custom = new CustomFigure({ x: 5, y: 5 });

        it("Creating Composite nodes", () => {
            expect(dot).toBeInstanceOf(Dot);
            expect(dot).toBeInstanceOf(Component);

            expect(dot.getCoordinates()).toStrictEqual({ x: 0, y: 0 });

            expect(circle).toBeInstanceOf(Circle);
            expect(circle).toBeInstanceOf(Component);

            expect(circle.getCoordinates()).toStrictEqual({ x: 1, y: 1 });

            expect(rectangle).toBeInstanceOf(Rectangle);
            expect(rectangle).toBeInstanceOf(Component);

            expect(rectangle.getCoordinates()).toStrictEqual({ x: 5, y: 5 });

            expect(custom).toBeInstanceOf(CustomFigure);
            expect(custom).toBeInstanceOf(Component);

            expect(custom.getCoordinates()).toStrictEqual({ x: 5, y: 5 });
        });

        it("Testing inner structure of figures", () => {
            expect(dot.getParent()).toBeNull();
            expect(dot.getChildren().length).toBe(0);

            expect(circle.getParent()).toBeNull();
            expect(circle.getChildren().length).not.toBe(0);
            circle.getChildren().forEach((comp) => {
                expect(comp).toBeInstanceOf(Dot);
                expect(comp.getParent()).toBe(circle);
            });

            expect(dot.getParent()).toBeNull();
            expect(dot.getChildren().length).toBe(0);

            expect(rectangle.getParent()).toBeNull();
            expect(rectangle.getChildren().length).not.toBe(0);
            rectangle.getChildren().forEach((comp) => {
                expect(comp).toBeInstanceOf(Dot);
                expect(comp.getParent()).toBe(rectangle);
            });

            expect(custom.getParent()).toBeNull();
            expect(custom.getChildren().length).toBe(2);

            const customCircle = custom.getChildren().at(0);
            const customRectangle = custom.getChildren().at(1);
            expect(customCircle).toBeInstanceOf(Circle);
            expect(customRectangle).toBeInstanceOf(Rectangle);
            customRectangle?.getChildren().forEach((comp) => {
                expect(comp).toBeInstanceOf(Dot);
                expect(comp.getParent()).toBe(customRectangle);
            });
        });

        it("Testing draw function on Components", () => {});
    });
});
