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

    setCoordinates(coordinates: Coordinates): Circle {
        this.coordinates = coordinates;
        return this;
    }

    setRadius(radius: number): Circle {
        this.radius = radius;
        return this;
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

    setCoordinates(coordinates: Coordinates): Rectangle {
        this.coordinates = coordinates;
        return this;
    }

    setWidth(width: number): Rectangle {
        this.width = width;
        return this;
    }

    setHeight(height: number): Rectangle {
        this.height = height;
        return this;
    }

    getCoordinates(): Coordinates {
        return this.coordinates;
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
