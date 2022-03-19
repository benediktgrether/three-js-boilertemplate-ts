import ThreeApp from "../ThreeApp";
import BasicCollideCube from "./Example/BasicCollideCube";
import BasicCube from "./Example/BasicCube";
import Car from "./Example/Car/Car";
import Floor from "./Example/Floor";

export default class World {
    threeApp: ThreeApp;
    scene: THREE.Scene;
    basicCube: BasicCube;
    floor: Floor;
    basicCollideCube: BasicCollideCube;
    car: Car;
    keyup: boolean;

    constructor() {
        this.threeApp = new ThreeApp();
        this.scene = this.threeApp.scene;
        // this.resources = this.threeApp.resources;

        // Loaded Basic Cube
        // this.basicCube = new BasicCube();
        // this.basicCollideCube = new BasicCollideCube();
        this.floor = new Floor();
        this.car = new Car();
        console.log(this.car.vehicle);
        this.keyEvent();
    }

    update(): void {
        // this.basicCollideCube.update();
        if (this.car) {
            this.car.update();
        }
    }


    driving(e: { type: string; keyCode: any; }): void {
        if (e.type != "keydown" && e.type != "keyup") return;
        this.keyup = e.type == "keyup";
        this.car.vehicle.setBrake(0, 0);
        this.car.vehicle.setBrake(0, 1);
        this.car.vehicle.setBrake(0, 2);
        this.car.vehicle.setBrake(0, 3);
      
        // tslint:disable-next-line: typedef
        let engineForce = 800;
        // tslint:disable-next-line: typedef
        let maxSteerVal = 0.3;
        switch (e.keyCode) {
      
          case 38: // forward
            this.car.vehicle.applyEngineForce(this.keyup ? 0 : -engineForce, 2);
            this.car.vehicle.applyEngineForce(this.keyup ? 0 : -engineForce, 3);
            break;
      
          case 40: // backward
            this.car.vehicle.applyEngineForce(this.keyup ? 0 : engineForce, 2);
            this.car.vehicle.applyEngineForce(this.keyup ? 0 : engineForce, 3);
            break;
      
          case 39: // right
            this.car.vehicle.setSteeringValue(this.keyup ? 0 : -maxSteerVal, 2);
            this.car.vehicle.setSteeringValue(this.keyup ? 0 : -maxSteerVal, 3);
            break;
      
          case 37: // left
            this.car.vehicle.setSteeringValue(this.keyup ? 0 : maxSteerVal, 2);
            this.car.vehicle.setSteeringValue(this.keyup ? 0 : maxSteerVal, 3);
            break;
        }
    }

    keyEvent(): void {
        console.log(this.car.vehicle);
        window.addEventListener("keydown", this.driving);
        window.addEventListener("keyup", this.driving);
    }
}