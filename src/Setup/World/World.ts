import ThreeApp from "../ThreeApp";
import BasicCollideCube from "./Example/BasicCollideCube";
import BasicCube from "./Example/BasicCube";
import Floor from "./Example/Floor";

export default class World {
    threeApp: ThreeApp;
    scene: THREE.Scene;
    basicCube: BasicCube;
    floor: Floor;
    basicCollideCube: BasicCollideCube;

    constructor() {
        this.threeApp = new ThreeApp();
        this.scene = this.threeApp.scene;
        // this.resources = this.threeApp.resources;

        // Loaded Basic Cube
        // this.basicCube = new BasicCube();
        this.basicCollideCube = new BasicCollideCube();
        this.floor = new Floor();
    }

    update(): void {
        this.basicCollideCube.update();
    }
}