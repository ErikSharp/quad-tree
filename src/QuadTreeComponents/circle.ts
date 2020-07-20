import { VectorContainer } from "./vectorContainer";
import { Rectangle } from "./rectangle";

export class Circle<T extends VectorContainer> {
    private rSquared: number;

    constructor(private x: number, private y: number, private radius: number) {
        this.rSquared = radius * radius;
    }

    contains(point: T) {
        // check if the point is in the circle by checking if the euclidean distance of
        // the point and the center of the circle if smaller or equal to the radius of
        // the circle
        let d =
            Math.pow(point.vector.x - this.x, 2) +
            Math.pow(point.vector.y - this.y, 2);
        return d < this.rSquared;
    }

    intersects(range: Rectangle<T>) {
        let xDist = Math.abs(range.x - this.x);
        let yDist = Math.abs(range.y - this.y);

        // radius of the circle
        let r = this.radius;

        let w = range.width;
        let h = range.height;

        let edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

        // no intersection
        if (xDist > r + w || yDist > r + h) return false;

        // intersection within the circle
        if (xDist <= w || yDist <= h) return true;

        // intersection on the edge of the circle
        return edges <= this.rSquared;
    }
}
