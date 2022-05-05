import ThreeApp from "../ThreeApp";
import BasicCollideCube from "./Example/Primitives/BasicCollideCube";
import BasicCube from "./Example/Primitives/BasicCube";
import Floor from "./Example/Primitives/Floor";
import foxFloor from "./Example/Model/Floor";
import Environment from "./Example/Model/Environment";
import Fox from "./Example/Model/Fox";

export default class World {
    threeApp: ThreeApp;
    scene: THREE.Scene;
    basicCube: BasicCube;
    floor: Floor;
    basicCollideCube: BasicCollideCube;
    keyup: boolean;
    resources: import("../Utils/Resources").default;
    foxFloor: foxFloor;
    environment: Environment;
    fox: Fox;

    constructor() {
        this.threeApp = new ThreeApp();
        this.scene = this.threeApp.scene;
        this.resources = this.threeApp.resources;
        // this.resources = this.threeApp.resources;

        // Loaded Basic Cube
        this.basicCube = new BasicCube();
        //this.basicCollideCube = new BasicCollideCube();

        //Wait for resources
        this.resources.on("ready", () => {
            this.foxFloor = new foxFloor();
            this.fox = new Fox();
            this.environment = new Environment();
        });
    }

    update(): void {
        //this.basicCollideCube.update();
        if (this.fox) {
            this.fox.update();
        }
    }
}