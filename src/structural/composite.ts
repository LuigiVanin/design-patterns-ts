export interface Coordinates {
    x: number;
    y: number;
}

export interface GraphicFigure {
    draw(): Coordinates[];
}

export class Component implements GraphicFigure {
    protected parent: Component | null = null;
    protected children: Component[] = [];
    protected coordinates: Coordinates = { x: 0, y: 0 };
    readonly isComposite: boolean;

    constructor(isComposite?: boolean) {
        this.isComposite = isComposite ?? false;
    }

    public setParent(parent: Component | null): void {
        this.parent = parent;
    }

    public getParent(): Readonly<Component | null> {
        return this.parent;
    }

    getChildren(): Readonly<Component[]> {
        return this.children;
    }

    protected add(child: Component): void {
        this.children.push(child);
        child.setParent(this);
    }

    public remove(child: Component): void {
        const index = this.children.indexOf(child);
        this.children.splice(index, 1);

        child.setParent(null);
    }

    public draw(): Coordinates[] {
        const dots: Coordinates[] = [];
        this.children.forEach((child) => {
            dots.push(...child.draw());
        });
        return dots;
    }

    getCoordinates() {
        return this.coordinates;
    }
}

export class Dot extends Component {
    constructor({ x, y }: Coordinates) {
        super();
        this.coordinates = { x, y };
    }

    public draw(): Coordinates[] {
        return [this.coordinates];
    }
}

export class Circle extends Component {
    public radius: number;

    constructor({ x, y }: Coordinates, radius: number) {
        super();
        this.coordinates = { x, y };
        this.radius = radius;

        for (let i = 0; i < this.radius; i++) {
            const x = Math.sqrt(this.radius ** 2 - i ** 2);
            this.add(
                new Dot({
                    x: this.coordinates.x + x,
                    y: this.coordinates.y + i,
                })
            );
            this.add(
                new Dot({
                    x: this.coordinates.x - x,
                    y: this.coordinates.y + i,
                })
            );
        }

        for (let i = this.radius; i > 0; i--) {
            const x = Math.sqrt(this.radius ** 2 - i ** 2);
            this.add(
                new Dot({
                    x: this.coordinates.x + x,
                    y: this.coordinates.y - i,
                })
            );
            this.add(
                new Dot({
                    x: this.coordinates.x - x,
                    y: this.coordinates.y - i,
                })
            );
        }
    }
}

export class Rectangle extends Component {
    public width: number;
    public height: number;

    constructor({ x, y }: Coordinates, width: number, height: number) {
        super();
        this.coordinates = { x, y };
        this.width = width;
        this.height = height;

        for (let i = 0; i < this.width; i++) {
            this.add(
                new Dot({ x: this.coordinates.x + i, y: this.coordinates.y })
            );
            this.add(
                new Dot({
                    x: this.coordinates.x + i,
                    y: this.coordinates.y + this.height,
                })
            );
        }

        for (let i = 0; i < this.height; i++) {
            this.add(
                new Dot({ x: this.coordinates.x, y: this.coordinates.y + i })
            );
            this.add(
                new Dot({
                    x: this.coordinates.x + this.width,
                    y: this.coordinates.y + i,
                })
            );
        }
    }
}

export class CustomFigure extends Component {
    constructor({ x, y }: Coordinates) {
        super();
        this.coordinates = { x, y };
        this.add(new Circle({ x, y }, 10));
        this.add(new Rectangle({ x, y }, 20, 20));
    }
}

export class GraphicFigureComposite extends Component {
    constructor() {
        super(true);
    }

    load(figures: Component[]): void {
        figures.forEach((figure) => {
            this.add(figure);
        });
    }
}
