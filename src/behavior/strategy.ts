export class ComplexNumber {
    constructor(private real: number, private imaginary: number) {}

    getReal() {
        return this.real;
    }

    getImaginary() {
        return this.imaginary;
    }

    log() {
        console.log(`${this.real} + ${this.imaginary}i`);
    }
}

interface OperationStrategy {
    execute(num1: ComplexNumber, num2: ComplexNumber): ComplexNumber;
}

export class AdditionStrategy implements OperationStrategy {
    execute(num1: ComplexNumber, num2: ComplexNumber): ComplexNumber {
        return new ComplexNumber(
            num1.getReal() + num2.getReal(),
            num1.getImaginary() + num2.getImaginary()
        );
    }
}

export class SubtractionStrategy implements OperationStrategy {
    execute(num1: ComplexNumber, num2: ComplexNumber) {
        return new ComplexNumber(
            num1.getReal() - num2.getReal(),
            num1.getImaginary() - num2.getImaginary()
        );
    }
}

export class MultiplicationStrategy implements OperationStrategy {
    execute(num1: ComplexNumber, num2: ComplexNumber) {
        return new ComplexNumber(
            num1.getReal() * num2.getReal() -
                num1.getImaginary() * num2.getImaginary(),
            num1.getReal() * num2.getImaginary() +
                num1.getImaginary() * num2.getReal()
        );
    }
}

export class ComplexContext {
    constructor(private strategy: OperationStrategy) {}

    executeStrategy(num1: ComplexNumber, num2: ComplexNumber) {
        return this.strategy.execute(num1, num2);
    }
}

export class AppExample {
    main(operation: string, num1: ComplexNumber, num2: ComplexNumber) {
        let strategy: OperationStrategy | null = null;

        switch (operation) {
            case "addition":
                strategy = new AdditionStrategy();
                break;
            case "subtraction":
                strategy = new SubtractionStrategy();
                break;
            case "multiplication":
                strategy = new MultiplicationStrategy();
                break;
            default:
                throw new Error("Invalid operation");
        }
        const ctx = new ComplexContext(strategy);
        const result = ctx.executeStrategy(num1, num2);

        return result;
    }
}
