import { Point } from "./point";

export class Rectangle<T extends Point> {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {}

    contains(point: T): boolean {
        return (
            point.x >= this.x &&
            point.x < this.x + this.width &&
            point.y >= this.y &&
            point.y < this.y + this.height
        );
    }

    intersects(other: Rectangle<T>): boolean {
        return !(
            other.x - other.width > this.x + this.width ||
            other.x + other.width < this.x - this.width ||
            other.y - other.height > this.y + this.height ||
            other.y + other.height < this.y - this.height
        );
    }

    toString() {
        return `x: ${this.x}, y: ${this.y}, w: ${this.width}, h: ${this.height}`;
    }
}
