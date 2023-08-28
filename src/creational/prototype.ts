import { Coordinates } from "../structural";

interface Prototype {
    clone(): Prototype;
}

export class Shape implements Prototype {
    protected coordinates: Coordinates = { x: 0, y: 0 };

    constructor(shape?: Shape) {
        if (!shape) return;
        this.coordinates = shape.getCoordinates();
    }

    getCoordinates(): Coordinates {
        return this.coordinates;
    }

    setCoordinates(coordinates: Coordinates) {
        this.coordinates = coordinates;
    }

    clone(): Shape {
        return new Shape(this);
    }
}

export class Circle extends Shape {
    private radius: number = 0;

    constructor(circle?: Circle) {
        super(circle);
        this.radius = circle?.getRadius() || 0;
        this.coordinates = circle?.getCoordinates() || { x: 0, y: 0 };
    }

    setRadius(radius: number) {
        this.radius = radius;
    }

    getCoordinates(): Coordinates {
        return this.coordinates;
    }

    getRadius(): number {
        return this.radius;
    }

    clone(): Circle {
        return new Circle(this);
    }
}

export class Rectangle extends Shape {
    private width: number = 0;
    private height: number = 0;

    constructor(rectangle?: Rectangle) {
        super(rectangle);
        this.coordinates = rectangle?.getCoordinates() || { x: 0, y: 0 };
        this.width = rectangle?.getWidth() || 0;
    }

    setWidth(width: number) {
        this.width = width;
    }

    setHeight(height: number) {
        this.height = height;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    clone() {
        return new Rectangle(this);
    }
}
