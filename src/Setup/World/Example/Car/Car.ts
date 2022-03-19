import * as THREE from "three";
import CANNON from "cannon";
import ThreeApp from "../../../ThreeApp";
import Time from "../../../Utils/Time";

export default class Car {
    threeApp: ThreeApp;
    scene: THREE.Scene;
    time: Time;
    cannonWorld: CANNON.World;
    defaultMaterial: CANNON.Material;
    geometry: THREE.BoxGeometry;
    texture: {};
    material: THREE.MeshBasicMaterial;
    mesh: any;
    chassisShape: CANNON.Box;
    chassisBody: CANNON.Body;
    vehicle: CANNON.RaycastVehicle;
    options: { radius: number; directionLocal: CANNON.Vec3; suspensionStiffness: number; suspensionRestLength: number; frictionSlip: number; dampingRelaxation: number; dampingCompression: number; maxSuspensionForce: number; rollInfluence: number; axleLocal: CANNON.Vec3; chassisConnectionPointLocal: CANNON.Vec3; maxSuspensionTravel: number; customSlidingRotationalSpeed: number; useCustomSlidingRotationalSpeed: boolean; };
    alexwidth: number;
    wheelBodies: any;
    wheelVisuals: any;
    quartenionWheel: CANNON.Quaternion;
    wheelShape: CANNON.Cylinder;
    wheelBody: CANNON.Body;
    wheelGeometry: THREE.CylinderGeometry;
    wheelMaterials: THREE.MeshPhongMaterial;
    wheelMesh: THREE.Mesh<any, any>;
    whellGeometry: any;
    transformWheel: any;
    keyup: boolean;


    constructor() {
        this.threeApp = new ThreeApp();
        this.scene = this.threeApp.scene;
        this.time = this.threeApp.time;
        this.cannonWorld = this.threeApp.cannonWorld;
        this.defaultMaterial = this.threeApp.physics.defaultMaterial;

        this.setGeometry();
        this.setMaterial();
        this.setMesh();

        // Setup Physic
        this.setPhysic();
        this.setRaycastVehicle();
        this.setCarWheels();

    }


    setGeometry(): void {
        this.geometry = new THREE.BoxGeometry(2, 0.6, 4);
    }

    setTexture(): void {
        this.texture = {};
    }

    setMaterial(): void {
        this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    }

    setMesh(): void {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.y = 1 / 2;
        this.scene.add(this.mesh);
    }

    setPhysic(): void {
        this.chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
        this.chassisBody = new CANNON.Body({
            mass: 150
        });

        this.chassisBody.addShape(this.chassisShape);
        this.chassisBody.position.set(0, 1 / 2, 0);
        this.chassisBody.angularVelocity.set(0, 0, 0);
    }

    setRaycastVehicle(): void {
        this.vehicle = new CANNON.RaycastVehicle({
            chassisBody: this.chassisBody,
            indexRightAxis: 0,
            indexUpAxis: 1,
            indexForwardAxis: 2
        });

        // this.vehicle.indexForwardAxis = 2;
    }

    setCarWheels(): void {
        this.options = {
            radius: 0.3,
            directionLocal: new CANNON.Vec3(0, -1, 0),
            suspensionStiffness: 45,
            suspensionRestLength: 0.4,
            frictionSlip: 5,
            dampingRelaxation: 2.3,
            dampingCompression: 4.5,
            maxSuspensionForce: 200000,
            rollInfluence: 0.01,
            axleLocal: new CANNON.Vec3(-1, 0, 0),
            chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
            maxSuspensionTravel: 0.25,
            customSlidingRotationalSpeed: -30,
            useCustomSlidingRotationalSpeed: true
        };

        this.alexwidth = 0.7;
        this.options.chassisConnectionPointLocal.set(this.alexwidth, 0 , -1);
        this.vehicle.addWheel(this.options);

        this.options.chassisConnectionPointLocal.set(- this.alexwidth, 0, -1);
        this.vehicle.addWheel(this.options);

        this.options.chassisConnectionPointLocal.set(this.alexwidth, 0, 1);
        this.vehicle.addWheel(this.options);

        this.options.chassisConnectionPointLocal.set(- this.alexwidth, 0, 1);
        this.vehicle.addWheel(this.options);


        this.wheelBodies = [];
        this.wheelVisuals = [];


        this.vehicle.wheelInfos.forEach((wheel) => {
            this.wheelShape = new CANNON.Cylinder(0.3, 0.3, 0.3 / 2, 20);
            this.wheelBody = new CANNON.Body({
                mass: 1,
                material: this.defaultMaterial
            });

            this.quartenionWheel = new CANNON.Quaternion();
            this.quartenionWheel.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI);
            this.wheelBody.addShape(this.wheelShape, new CANNON.Vec3(), this.quartenionWheel);
            this.wheelBodies.push(this.wheelBody);

            // Showing Wheel
            this.wheelGeometry = new THREE.CylinderBufferGeometry(wheel.radius, wheel.radius, 0.4, 32);
            this.wheelMaterials = new THREE.MeshPhongMaterial({
                color: 0xd0901d,
                emissive: 0xaa0000,
                side: THREE.DoubleSide
            });

            this.wheelMesh = new THREE.Mesh(this.whellGeometry, this.wheelMaterials);
            this.wheelMesh.rotateZ(Math.PI / 2);
            this.wheelVisuals.push(this.wheelMesh);
            this.scene.add(this.wheelMesh);
        });

        this.cannonWorld.addEventListener("postStep", () => {
            for (let i: number = 0; i < this.vehicle.wheelInfos.length; i ++) {
                // this.vehicle.updateWheelTransform(i);
                this.transformWheel = this.vehicle.wheelInfos[i].worldTransform;

                this.wheelBodies[i].position.copy(this.transformWheel.position);
                this.wheelBodies[i].quaternion.copy(this.transformWheel.quaternion);

                // Update Wheel Visuals Position
                this.wheelVisuals[i].position.copy(this.transformWheel.position);
                this.wheelVisuals[i].quaternion.copy(this.transformWheel.quaternion);
            }
        });
    }

    updatePhysics(): void {
        this.cannonWorld.step(1 / 60);
        this.mesh.position.copy(this.chassisBody.position);
        this.mesh.quaternion.copy(this.chassisBody.quaternion);
    }

    update(): void {
        this.updatePhysics();
    }

}