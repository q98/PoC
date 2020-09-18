import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, Color3 } from '@babylonjs/core';
import { GridMaterial } from 'babylonjs-materials';

let canvas: HTMLCanvasElement;

let engine: Engine;

let scene: Scene;

let camera: ArcRotateCamera;

let hemisphericLight: HemisphericLight;

let deltaTime: number;

let lastTime: number;

let isPaused = false;

let gridmaterial: GridMaterial;

const init = (container: HTMLElement) => {
  canvas = document.createElement('canvas');
  container.appendChild(canvas);

  engine = new Engine(canvas);
  scene = new Scene(engine);
  hemisphericLight = new HemisphericLight('light', new Vector3(-1, 0, 1), scene);
camera = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 3, new Vector3(0, 1, 0), scene);
        camera.attachControl(canvas, true);


        let gridMesh = Mesh.CreateGround("grid", 1000.0, 1000.0, 1000, scene);
        


        gridmaterial = new GridMaterial("GridMaterial", scene);
        gridmaterial.mainColor = new Color3(1, 1, 1);
        gridmaterial.lineColor = new Color3(1.0, 1.0, 1.0);

        gridMesh.material = gridmaterial;

  return scene;
};

const render = () => {
  engine.runRenderLoop(() => { 
    if(!isPaused) {
      if(lastTime) {
        deltaTime = (Date.now() - lastTime) / 1000;
      } else {
        deltaTime = 0;
      }
      
      scene.render();
      
      lastTime = Date.now();
    }
  });
};

const pause = () => {
  isPaused = true;
};

const resume = () => {
  isPaused = false;

  lastTime = Date.now();
};

const getScene = () => scene;

const getCanvas = () => canvas;

const getCamera = () => camera;

const getDeltaTime = () => deltaTime;

export default {
  init,
  render,
  pause,
  resume,
  getScene,
  getCanvas,
  getCamera,
  getDeltaTime,
};