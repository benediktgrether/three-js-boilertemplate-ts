import ThreeApp from "../ThreeApp";
import BasicCube from "./Example/BasicCube";

export default class World {
    threeApp: ThreeApp;
    scene: THREE.Scene;
    basicCube: BasicCube;

    constructor() {
        this.threeApp = new ThreeApp();
        this.scene = this.threeApp.scene;
        // this.resources = this.threeApp.resources;

        // Loaded Basic Cube
        this.basicCube = new BasicCube();
    }

    // update(){

    // }
}