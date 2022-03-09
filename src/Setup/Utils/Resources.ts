import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import EventEmitter from "./EventEmitter";

interface ILoader {
    gltfLoader: THREE.LoadingManager;
    textureLoader: THREE.LoadingManager;
    cubeTextureLoader: THREE.LoadingManager;
}

export default class Resources extends EventEmitter {
    sources: any;
    item: {};
    toLoad: number;
    loaded: number;
    loader: any;
    // loader: {};


    constructor(_sources: any) {
        super();
        this.sources = _sources;

        // Setup Resources
        this.item = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders(): void {
        this.loader = {};
        this.loader.gltfLoader = new GLTFLoader();
        this.loader.textureLoader = new THREE.TextureLoader();
        this.loader.cubeTextureLoader = new THREE.CubeTextureLoader();
    }
}