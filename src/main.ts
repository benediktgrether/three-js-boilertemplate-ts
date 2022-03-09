import ThreeApp from "./Setup/ThreeApp";

// tslint:disable-next-line: typedef
const threeApp = new ThreeApp(document.querySelector("canvas.three-js-app") as HTMLCanvasElement);

console.log(threeApp);