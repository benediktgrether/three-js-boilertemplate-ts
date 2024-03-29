import * as THREE from "three";
import App from "../../../App";
import CANNON from "cannon";
import Time from "../../../Utils/Time";

export default class Floor {
    app: App;
    scene: THREE.Scene;
    time: Time;
    cannonWorld: CANNON.World;
    defaultMaterial: CANNON.Material;
    geometry: THREE.PlaneGeometry;
    texture: {};
    material: THREE.MeshBasicMaterial;
    floorShape: CANNON.Plane;
    floorBody: CANNON.Body;
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.time = this.app.time;
        this.cannonWorld = this.app.cannonWorld;
        this.defaultMaterial = this.app.physics.defaultMaterial;

        // Setup Floor
        this.setGeometry();
        this.setMaterial();
        this.setMesh();
        this.setPhysics();
    }

    setGeometry(): void {
        this.geometry = new THREE.PlaneGeometry(10, 10, 10);
    }

    setTexture(): void {
        this.texture = {};
    }

    setMaterial(): void {
        this.material = new THREE.MeshBasicMaterial({
            color: 0x567d46,
            side: THREE.DoubleSide
        });
    }

    setMesh(): void {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = Math.PI / 2;
        this.mesh.position.y = -2;
        this.scene.add(this.mesh);
    }

    setPhysics(): void {
        this.floorShape = new CANNON.Plane();
        this.floorBody = new CANNON.Body({
            mass: 0,
            shape: this.floorShape,
            material: this.defaultMaterial
        });
        this.floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5);
        this.floorBody.position.y = this.mesh.position.y;
        this.cannonWorld.addBody(this.floorBody);
    }
}