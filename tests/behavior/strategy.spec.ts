import {
    AdditionStrategy,
    AppExample,
    ComplexContext,
    ComplexNumber,
    MultiplicationStrategy,
    SubtractionStrategy,
} from "../../src/behavior/strategy";

describe("Behavioral Patterns", () => {
    describe("Strategy Patterns", () => {
        it("should make the correct operation following the strategy", () => {
            const addStrategy = new AdditionStrategy();

            const addCtx = new ComplexContext(addStrategy);

            let result = addCtx.executeStrategy(
                new ComplexNumber(1, 2),
                new ComplexNumber(3, 4)
            );

            expect(result.getReal()).toBe(4);
            expect(result.getImaginary()).toBe(6);

            const subStrategy = new SubtractionStrategy();

            const subCtx = new ComplexContext(subStrategy);

            result = subCtx.executeStrategy(
                new ComplexNumber(1, 2),
                new ComplexNumber(3, 4)
            );

            expect(result.getReal()).toBe(-2);
            expect(result.getImaginary()).toBe(-2);

            const mulStrategy = new MultiplicationStrategy();

            const mulCtx = new ComplexContext(mulStrategy);

            result = mulCtx.executeStrategy(
                new ComplexNumber(1, 2),
                new ComplexNumber(3, 4)
            );

            expect(result.getReal()).toBe(-5);
            expect(result.getImaginary()).toBe(10);
        });
        it("should throw an error when the operation is invalid", () => {
            const app = new AppExample();
            let result = app.main(
                "addition",
                new ComplexNumber(1, 2),
                new ComplexNumber(3, 4)
            );

            expect(result.getReal()).toBe(4);
            expect(result.getImaginary()).toBe(6);

            result = app.main(
                "subtraction",
                new ComplexNumber(1, 2),
                new ComplexNumber(3, 4)
            );

            expect(result.getReal()).toBe(-2);
            expect(result.getImaginary()).toBe(-2);

            result = app.main(
                "multiplication",
                new ComplexNumber(1, 2),
                new ComplexNumber(3, 4)
            );

            expect(result.getReal()).toBe(-5);
            expect(result.getImaginary()).toBe(10);
        });
    });
});
