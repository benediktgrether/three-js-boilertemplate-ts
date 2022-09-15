import * as THREE from "three";
import App from "../../../App";

export default class Fox {
    app: App;
    scene: THREE.Scene;
    resources: import("../../../Utils/Resources").default;
    debug: import("../../../Utils/Debug").default;
    time: import("../../../Utils/Time").default;
    debugFolder: any;
    model: any;
    animation: any;
    resource: any;

    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.resources = this.app.resources;
        this.time = this.app.time;
        this.debug = this.app.debug;

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("fox");
        }

        // Resource
        this.resources = this.resources.items.foxModel;
        console.log(this.resources);

        this.setModel();
        this.setAnimation();
    }

    setModel(): void {
        this.model = this.resources.scene;
        this.model.scale.set(0.02, 0.02, 0.02);
        this.scene.add(this.model);

        this.model.traverse((child: { castShadow: boolean; }) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
    }

    setAnimation(): void {
        this.animation = {};

        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model);

        // Actions
        this.animation.actions = {};

        console.log(this.resource);

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resources.animations[0]);
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resources.animations[1]);
        this.animation.actions.running = this.animation.mixer.clipAction(this.resources.animations[2]);

        this.animation.actions.current = this.animation.actions.idle;
        this.animation.actions.current.play();

        // Play the action
        this.animation.play = (name: string | number) => {
            const newAction: any = this.animation.actions[name];
            const oldAction: any = this.animation.actions.current;

            newAction.reset();
            newAction.play();
            newAction.crossFadeFrom(oldAction, 1);

            this.animation.actions.current = newAction;
        };

        // Debug
        if (this.debug.active) {
            const debugObject: any = {
                playIdle: () => { this.animation.play("idle"); },
                playWalking: () => { this.animation.play("walking"); },
                playRunning: () => { this.animation.play("running"); }
            };
            this.debugFolder.add(debugObject, "playIdle");
            this.debugFolder.add(debugObject, "playWalking");
            this.debugFolder.add(debugObject, "playRunning");
        }
    }

    update(): void {
        this.animation.mixer.update(this.time.delta * 0.001);
    }
}