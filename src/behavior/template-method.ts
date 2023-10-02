type ColorRGB = [number, number, number];
type Canvas<T> = Array<Array<T>>;
type CanvasRGB = Canvas<ColorRGB>;

const createColorRed = (): ColorRGB => {
    return [255, 0, 0];
};

const createColorGreen = (): ColorRGB => {
    return [0, 255, 0];
};

const createColorBlack = (): ColorRGB => {
    return [0, 0, 0];
};

const createColorWhite = (): ColorRGB => {
    return [255, 255, 255];
};

export class Drawer {
    canvas: CanvasRGB | null = null;
    fileName: string = "NormalDrawer.txt";

    draw() {
        this.createCanvas();
        this.drawBackground();
        this.drawFisrtLayer();
        this.saveCanvas();

        return this.closeCanvas();
    }

    protected createCanvas() {
        const canvas: CanvasRGB = Array(100).fill(
            Array(100).fill(createColorWhite())
        );
        this.canvas = canvas;
    }
    protected drawBackground() {}
    protected drawFisrtLayer() {}
    protected saveCanvas() {
        // This function save the canvas with its fileName
    }
    protected closeCanvas() {
        const tmpCanvas = this.canvas;
        this.canvas = null;
        return tmpCanvas;
    }
}

export class DrawerBlackBackground extends Drawer {
    protected drawBackground(): void {
        const canvas = this.canvas;
        if (!canvas) return;
        for (let i = 0; i < canvas.length; i++) {
            for (let j = 0; j < canvas[i].length; j++) {
                canvas[i][j] = createColorBlack();
            }
        }
    }

    protected saveCanvas(): void {
        this.fileName = "BlackDrawer.txt";
        super.saveCanvas();
    }
}

export class DrawerRedBackground extends Drawer {
    protected drawBackground(): void {
        const canvas = this.canvas;
        if (!canvas) return;
        for (let i = 0; i < canvas.length; i++) {
            for (let j = 0; j < canvas[i].length; j++) {
                canvas[i][j] = createColorRed();
            }
        }
    }

    protected saveCanvas(): void {
        this.fileName = "RedDrawer.txt";
        super.saveCanvas();
    }
}
