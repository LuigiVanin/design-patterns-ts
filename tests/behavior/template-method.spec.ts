import {
    Drawer,
    DrawerBlackBackground,
    DrawerRedBackground,
} from "../../src/behavior/template-method";

describe("Behavioral Patterns", () => {
    describe("Template Method Pattern", () => {
        it("Testing the base form of the Drawer template method class", () => {
            const normalDrawer = new Drawer();
            expect(normalDrawer.canvas).toBeNull();
            const result = normalDrawer.draw();
            expect(result).not.toBeNull();

            result?.forEach((row) => {
                row.forEach((rgb) => expect(rgb.length).toBe(3));
            });

            expect(normalDrawer.fileName).toBe("NormalDrawer.txt");
            expect(normalDrawer.canvas).toBeNull();
        });

        it("Testing the DrawerBlackBackground class that generates a different draw output and fileName", () => {
            const blackDrawer = new DrawerBlackBackground();
            expect(blackDrawer.canvas).toBeNull();
            const result = blackDrawer.draw();
            expect(result).not.toBeNull();

            result?.forEach((row) => {
                row.forEach((rgb) => {
                    expect(rgb.length).toBe(3);
                    expect(rgb).toStrictEqual([0, 0, 0]);
                });
            });

            expect(blackDrawer.fileName).toBe("BlackDrawer.txt");
            expect(blackDrawer.canvas).toBeNull();
        });

        it("Testing the DrawerRedBackground class that generates a different draw output and fileName", () => {
            const redDrawer = new DrawerRedBackground();
            expect(redDrawer.canvas).toBeNull();
            const result = redDrawer.draw();
            expect(result).not.toBeNull();

            result?.forEach((row) => {
                row.forEach((rgb) => {
                    expect(rgb.length).toBe(3);
                    expect(rgb).toStrictEqual([255, 0, 0]);
                });
            });

            expect(redDrawer.fileName).toBe("RedDrawer.txt");
            expect(redDrawer.canvas).toBeNull();
        });
    });
});
