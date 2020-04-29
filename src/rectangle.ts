import p5, { Vector } from "p5";

export class Rectangle {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {}

    contains(point: Vector): boolean {
        return (
            point.x >= this.x &&
            point.x < this.x + this.width &&
            point.y >= this.y &&
            point.y < this.y + this.height
        );
    }

    intersects(other: Rectangle): boolean {
        return true;
    }

    toString() {
        return `x: ${this.x}, y: ${this.y}, w: ${this.width}, h: ${this.height}`;
    }
}
