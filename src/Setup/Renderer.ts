import * as THREE from "three";
import App from "./App";

export default class Renderer {

    app: App;
    canvas: HTMLCanvasElement | undefined;
    sizes: import("./Utils/Sizes").default;
    camera: import("./Camera").default;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;

    constructor() {
        this.app = new App();
        this.canvas = this.app.canvas;
        this.sizes = this.app.sizes;
        this.scene = this.app.scene;
        this.camera = this.app.camera;

        this.setInstance();
    }

    setInstance(): void {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize(): void {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(): void {
        this.renderer.render(this.scene, this.camera.camera);
    }
}