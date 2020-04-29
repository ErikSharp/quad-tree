import p5 from "p5";
import { Drawable } from "./drawable";
import { Updatable } from "./updatable";
import { Rectangle } from "./rectangle";
import { QuadTree } from "./quadTree";

export class Sketch implements Drawable, Updatable {
    updatables: Updatable[] = [];
    drawables: Drawable[] = [];

    constructor(private p: p5) {
        p.createCanvas(innerWidth * 0.8, innerHeight * 0.8);

        let boundary = new Rectangle(0, 0, p.width, p.height);
        let tree = new QuadTree(p, boundary, 4);

        this.drawables.push(tree);
        this.updatables.push(tree);
    }

    update() {
        this.updatables.forEach((u) => u.update());
    }

    draw() {
        this.p.background(0);
        this.drawables.forEach((d) => d.draw());
    }
}
