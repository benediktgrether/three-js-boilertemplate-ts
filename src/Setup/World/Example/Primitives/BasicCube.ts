import * as THREE from "three";
import App from "../../../App";
import Time from "../../../Utils/Time";

export default class BasicCube {
    app: App;
    scene: THREE.Scene;
    time: Time;
    geometry: THREE.BoxGeometry;
    texture: {};
    material: THREE.MeshBasicMaterial;
    mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
    color: number;

    constructor(_color: number) {
        this.app = new App();
        this.scene = this.app.scene;
        this.time = this.app.time;

        this.color = _color;

        this.setGeometry();
        this.setTexture();
        this.setMaterial();
        this.setMesh();

    }
    setGeometry(): void {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    setTexture(): void {
        this.texture = {};
    }

    setMaterial(): void {

        console.log(this.color);

        this.material = new THREE.MeshBasicMaterial({
            color: this.color,
            wireframe: false
        });
        console.log("material: ", this.material);
    }

    setMesh(): void {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.y = 1 / 2;
        this.scene.add(this.mesh);
    }
}