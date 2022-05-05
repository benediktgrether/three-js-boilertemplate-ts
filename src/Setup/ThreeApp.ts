import * as THREE from "three";

import Debug from "./Utils/Debug";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import CANNON from "cannon";
import Physics from "./Utils/Physics";
import Resources from "./Utils/Resources";

import sources from "./sources";

// tslint:disable-next-line: no-any
let instance: any = null;

export default class ThreeApp {
    canvas: HTMLCanvasElement | undefined;
    sizes: Sizes;
    time: Time;
    scene: THREE.Scene;
    camera: Camera;
    renderer: Renderer;
    world: World;
    cannonWorld: CANNON.World;
    physics: Physics;
    resources: Resources;
    debug: Debug;


    constructor(_canvas?: HTMLCanvasElement) {

        // Singleton
        if (instance) {
            return instance;
        }

        instance = this;

        this.canvas = _canvas;

        this.debug = new Debug();

        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();

        // Import Resources
        this.resources = new Resources(sources);

        this.camera = new Camera();
        this.renderer = new Renderer();
        this.cannonWorld = new CANNON.World();
        this.physics = new Physics();

        this.world = new World();

        // Size resize event
        this.sizes.on("resize", () => {
            this.resize();
        });

        // Time updateAnimationFrame event
        this.time.on("updateAnimationFrame", () => {
            this.update();
        });
    }

    resize(): void {
        this.camera.resize();
        this.renderer.resize();
    }

    update(): void {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }
}