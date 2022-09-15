import App from "../App";
import CANNON from "cannon";

export default class Physics {
    app: App;
    cannonWorld: CANNON.World;
    defaultMaterial: CANNON.Material;
    defaultContactMaterial: CANNON.ContactMaterial;
    broadphase: CANNON.SAPBroadphase;
    allowSleep: boolean;

    constructor() {
        this.app = new App();
        this.cannonWorld = this.app.cannonWorld;
        this.setPhysicVariables();
    }

    setPhysicVariables(): void {
        this.cannonWorld.gravity.set(0, -9.82, 0);
        this.broadphase = new CANNON.SAPBroadphase(this.cannonWorld);
        this.allowSleep = true;
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