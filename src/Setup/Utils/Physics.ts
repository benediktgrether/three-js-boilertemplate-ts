import ThreeApp from "../ThreeApp";
import CANNON from "cannon";

export default class Physics {
    threeApp: ThreeApp;
    cannonWorld: CANNON.World;
    defaultMaterial: CANNON.Material;
    defaultContactMaterial: CANNON.ContactMaterial;
    constructor() {
        this.threeApp = new ThreeApp();
        this.cannonWorld = this.threeApp.cannonWorld;
        this.setPhysicVariables();
    }
    setPhysicVariables(): void {
        this.cannonWorld.gravity.set(0, -9.82, 0);
        this.defaultMaterial = new CANNON.Material("default");
        this.defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.2
            }
        );

        this.cannonWorld.addContactMaterial(this.defaultContactMaterial);
    }
}