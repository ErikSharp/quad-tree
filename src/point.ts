import { VectorContainer } from "./QuadTreeComponents/vectorContainer";
import p5, { Vector } from "p5";

export class Point implements VectorContainer {
    private _vector: Vector;

    constructor(p: p5, x: number, y: number) {
        this._vector = p.createVector(x, y);
    }

    get vector(): Vector {
        return this._vector;
    }
}
