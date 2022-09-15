import App from "../App";
import BasicCollideCube from "./Example/Primitives/BasicCollideCube";
import BasicCube from "./Example/Primitives/BasicCube";
import Floor from "./Example/Primitives/Floor";
import foxFloor from "./Example/Model/Floor";
import Environment from "./Example/Model/Environment";
import Fox from "./Example/Model/Fox";

export default class World {
    app: App;
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
        this.app = new App();
        this.scene = this.app.scene;
        // this.resources = this.app.resources;

        // Loaded Basic Cube
        this.basicCube = new BasicCube(0xffffff);

        //Physic
        // this.floor = new Floor();
        // this.basicCollideCube = new BasicCollideCube();

        //Wait for resources
        // this.resources.on("ready", () => {
        //     this.foxFloor = new foxFloor();
        //     this.fox = new Fox();
        //     this.environment = new Environment();
        // });
    }

    update(): void {
        // this.basicCollideCube.update();
        // if (this.fox) {
        //     this.fox.update();
        // }
    }
}