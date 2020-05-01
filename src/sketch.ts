import p5 from "p5";
import { Drawable } from "./drawable";
import { Updatable } from "./updatable";
import { Rectangle } from "./QuadTreeComponents/rectangle";
import { QuadTree } from "./QuadTreeComponents/quadTree";
import { Point } from "./point";

export class Sketch implements Drawable, Updatable {
    updatables: Updatable[] = [];
    drawables: Drawable[] = [];
    tree: QuadTree<Point>;

    constructor(private p: p5) {
        p.createCanvas(innerWidth * 0.8, innerHeight * 0.8);

        let boundary = new Rectangle(0, 0, p.width, p.height);
        this.tree = new QuadTree<Point>(p, boundary, 4);

        this.drawables.push(this.tree);
    }

    update() {
        this.updatables.forEach((u) => u.update());

        if (this.p.mouseIsPressed) {
            for (let i = 0; i < 5; i++) {
                this.tree.insert(
                    new Point(
                        this.p,
                        this.p.mouseX + this.p.random(-5, 5),
                        this.p.mouseY + this.p.random(-5, 5)
                    )
                );
            }
        }
    }

    draw() {
        this.p.background(0);
        this.drawables.forEach((d) => d.draw());

        let range = new Rectangle(this.p.mouseX, this.p.mouseY, 50, 50);
        let points = this.tree.query(range);
        console.log(points.length);
        this.p.stroke(0, 255, 0);
        this.p.rect(range.x, range.y, range.width, range.height);

        this.p.strokeWeight(4);
        points.forEach((dot) => this.p.point(dot.vector.x, dot.vector.y));
        this.p.strokeWeight(1);
    }
}
