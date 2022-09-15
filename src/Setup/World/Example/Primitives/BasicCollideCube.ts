import * as THREE from "three";
import CANNON from "cannon";
import App from "../../../App";
import Time from "../../../Utils/Time";

export default class BasicCollideCube {
    app: App;
    scene: THREE.Scene;
    time: Time;
    geometry: THREE.BoxGeometry;
    texture: {};
    material: THREE.MeshBasicMaterial;
    mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
    boxShape: any;
    boxBody: any;
    cannonWorld: CANNON.World;
    defaultMaterial: CANNON.Material;

    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.time = this.app.time;
        this.cannonWorld = this.app.cannonWorld;
        this.defaultMaterial = this.app.physics.defaultMaterial;

        this.setGeometry();
        this.setTexture();
        this.setMaterial();
        this.setMesh();
        this.setPhysics();

    }
    setGeometry(): void {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    setTexture(): void {
        this.texture = {};
    }

    setMaterial(): void {
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: false
        });
    }

    setMesh(): void {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        // this.mesh.position.y = 1 / 2;
        this.mesh.position.y = 3;
        this.scene.add(this.mesh);
    }

    setPhysics(): void {
        this.boxShape = new CANNON.Box(new CANNON.Vec3(1 * 0.5, 1 * 0.5, 1 * 0.5));
        this.boxBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 1 / 2, 0),
            angularVelocity: new CANNON.Vec3(0, 0, 1 * 0.5),
            shape: this.boxShape,
            material: this.defaultMaterial
        });

        this.boxBody.position.copy(this.mesh.position);
        this.cannonWorld.addBody(this.boxBody);

    }

    update(): void {
        this.cannonWorld.step(1 / 60, this.time.delta, 3);
        this.mesh.position.copy(this.boxBody.position);
        this.mesh.quaternion.copy(this.boxBody.quaternion);
    }
}