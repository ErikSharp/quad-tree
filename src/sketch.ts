import p5 from "p5";
import { Drawable } from "./drawable";
import { Updatable } from "./updatable";
import { Rectangle } from "./rectangle";
import { QuadTree } from "./quadTree";

export class Sketch implements Drawable, Updatable {
    updatables: Updatable[] = [];
    drawables: Drawable[] = [];
    tree: QuadTree;

    constructor(private p: p5) {
        p.createCanvas(innerWidth * 0.8, innerHeight * 0.8);

        let boundary = new Rectangle(0, 0, p.width, p.height);
        this.tree = new QuadTree(p, boundary, 4);

        this.drawables.push(this.tree);
        this.updatables.push(this.tree);
    }

    update() {
        this.updatables.forEach((u) => u.update());
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
        points.forEach((point) => this.p.point(point.x, point.y));
        this.p.strokeWeight(1);
    }
}
