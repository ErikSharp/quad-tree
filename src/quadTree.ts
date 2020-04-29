import p5, { Vector, RECT_MODE } from "p5";
import { Rectangle } from "./rectangle";
import { Drawable } from "./drawable";
import { Updatable } from "./updatable";

export class QuadTree implements Drawable, Updatable {
    private points: Vector[] = [];
    private divided = false;
    private northwest: QuadTree;
    private northeast: QuadTree;
    private southwest: QuadTree;
    private southeast: QuadTree;

    constructor(
        private p: p5,
        private boundary: Rectangle,
        private capacity: number
    ) {}

    insert(point: Vector): boolean {
        let notInBoundary = !this.boundary.contains(point);
        if (notInBoundary) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }

            if (!this.northwest.insert(point)) {
                if (!this.northeast.insert(point)) {
                    if (!this.southeast.insert(point)) {
                        if (!this.southwest.insert(point)) {
                            console.error(
                                `cannot insert x:${point.x} y:${point.y}`
                            );
                        }
                    }
                }
            }

            return true;
        }
    }

    private subdivide() {
        let nw = new Rectangle(
            this.boundary.x,
            this.boundary.y,
            this.boundary.width / 2,
            this.boundary.height / 2
        );
        this.northwest = new QuadTree(this.p, nw, this.capacity);

        let ne = new Rectangle(
            this.boundary.x + this.boundary.width / 2,
            this.boundary.y,
            this.boundary.width / 2,
            this.boundary.height / 2
        );
        this.northeast = new QuadTree(this.p, ne, this.capacity);

        let sw = new Rectangle(
            this.boundary.x,
            this.boundary.y + this.boundary.height / 2,
            this.boundary.width / 2,
            this.boundary.height / 2
        );
        this.southwest = new QuadTree(this.p, sw, this.capacity);

        let se = new Rectangle(
            this.boundary.x + this.boundary.width / 2,
            this.boundary.y + this.boundary.height / 2,
            this.boundary.width / 2,
            this.boundary.height / 2
        );
        this.southeast = new QuadTree(this.p, se, this.capacity);

        this.divided = true;
    }

    query(range: Rectangle, arr: Vector[] = []): Vector[] {
        if (!this.boundary.intersects(range)) {
            return arr;
        } else {
            this.points.forEach((point) => {
                if (range.contains(point)) {
                    arr.push(point);
                }
            });

            if (this.divided) {
                this.northwest.query(range, arr);
                this.northeast.query(range, arr);
                this.southwest.query(range, arr);
                this.southeast.query(range, arr);
            }

            return arr;
        }
    }

    rect: Rectangle = new Rectangle(350, 350, 150, 150);

    update() {
        if (this.p.mouseIsPressed) {
            for (let i = 0; i < 5; i++) {
                this.insert(
                    this.p.createVector(
                        this.p.mouseX + this.p.random(-5, 5),
                        this.p.mouseY + this.p.random(-5, 5)
                    )
                );
            }
        }
    }

    draw() {
        this.p.stroke(0, 255, 0);
        this.p.rect(350, 350, 150, 150);

        this.p.stroke(255);
        this.p.noFill();
        this.p.rect(
            this.boundary.x,
            this.boundary.y,
            this.boundary.width,
            this.boundary.height
        );

        this.points.forEach((point) => this.p.point(point.x, point.y));

        this.p.stroke(0, 255, 0);
        let points = this.query(this.rect);
        points.forEach((point) => this.p.point(point.x, point.y));

        if (this.divided) {
            this.northeast.draw();
            this.northwest.draw();
            this.southeast.draw();
            this.southwest.draw();
        }
    }

    getPoints(): Vector[] {
        return this.points
            .concat(this.northeast ? this.northeast.getPoints() : [])
            .concat(this.northwest ? this.northwest.getPoints() : [])
            .concat(this.southeast ? this.southeast.getPoints() : [])
            .concat(this.southwest ? this.southwest.getPoints() : []);
    }
}
