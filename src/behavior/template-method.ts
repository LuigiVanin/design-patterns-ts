type Color = [number, number, number];
type Canvas = Array<Array<Color>>;

abstract class Drawer<T> {
    layers: ((drawer: Drawer<T>) => void)[] = [];
    canvas: T | null = null;

    draw() {
        this.createCanvas();
        this.drawBackground();
        this.drawFisrtLayer();
        this.layers.forEach((layerAction) => {
            layerAction(this);
        });
        this.drawLastLayer();
        const canvas = this.saveCanvas();
        this.closeCanvas();
        return canvas;
    }

    protected abstract createCanvas(): void;
    protected abstract drawBackground(): void;
    protected abstract drawFisrtLayer(): void;
    protected abstract drawLastLayer(): void;
    protected abstract saveCanvas(): T;
    protected abstract closeCanvas(): void;
}

class VirtualDrawer extends Drawer<Canvas> {
    protected createCanvas(): void {
        throw new Error("Method not implemented.");
    }

    protected drawBackground(): void {
        throw new Error("Method not implemented.");
    }

    protected drawFisrtLayer(): void {
        throw new Error("Method not implemented.");
    }

    protected drawLastLayer(): void {
        throw new Error("Method not implemented.");
    }

    protected saveCanvas(): Canvas {
        throw new Error("Method not implemented.");
    }

    protected closeCanvas(): void {
        throw new Error("Method not implemented.");
    }
}
