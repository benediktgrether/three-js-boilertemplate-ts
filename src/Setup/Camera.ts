import * as THREE from "three";
import App from "./App";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
    app: App;

    scene: THREE.Scene;
    canvas: HTMLCanvasElement | undefined;
    controls: OrbitControls;
    sizes: import("./Utils/Sizes").default;
    camera: THREE.PerspectiveCamera;


    constructor() {
        this.app = new App();
        this.sizes = this.app.sizes;
        this.scene = this.app.scene;
        this.canvas = this.app.canvas;

        this.setInstance();
        this.setOrbitControls();
    }

    setInstance(): void {
        this.camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);

        this.camera.position.set(6, 4, 8);

        this.scene.add(this.camera);
    }

    setOrbitControls(): void {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
    }

    resize(): void {
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
    }

    update(): void {
        this.controls.update();
    }
}