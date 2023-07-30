import { Coordinates } from "./composite";

interface UnitAdapter {
    convertUnit(coords: Coordinates): Coordinates;
}

export class CentimeterAdapter implements UnitAdapter {
    convertUnit(coords: Coordinates): Coordinates {
        return {
            x: coords.x,
            y: coords.y,
        };
    }
}

export class MillimeterAdapter implements UnitAdapter {
    convertUnit(coords: Coordinates): Coordinates {
        return {
            x: coords.x * 10,
            y: coords.y * 10,
        };
    }
}

export class MeterAdapter implements UnitAdapter {
    convertUnit(coords: Coordinates): Coordinates {
        return {
            x: coords.x / 100,
            y: coords.y / 100,
        };
    }
}

export class FeetAdapter implements UnitAdapter {
    convertUnit(coords: Coordinates): Coordinates {
        return {
            x: coords.x * 30.48,
            y: coords.y * 30.48,
        };
    }
}

export class Converter {
    constructor(private adapter: UnitAdapter) {}

    execute(coords: Coordinates[]) {
        return coords.map((coord) => this.adapter.convertUnit(coord));
    }
}
