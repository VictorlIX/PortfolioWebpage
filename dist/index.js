
//import * as THREE from 'three';

import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
//for loading models
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
//import { ObjectLoader } from 'three';




//Always need scene, camara and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
//set to window device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
//make full screen canvas, set render size to window size
renderer.setSize(window.innerWidth, window.innerHeight);
//move along Z axis to get ver perspective when adding shapes
camera.position.setZ(30);

//render=draw
renderer.render(scene, camera);

//Object 1.you need a geometry 2.Material 3.Mes
const saturnRingTexture = new THREE.TextureLoader().load('rings.jpeg');

const geometry = new THREE.TorusGeometry(6, 1.2, 2, 100);
const material = new THREE.MeshStandardMaterial({ 
  map: saturnRingTexture ,
  
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//Successfully loads our motionless model
//tring to load model
/*const loader = new GLTFLoader();
loader.load( 'assets/Wraith_Animated.glb', function ( glb ) {
  
  glb.animations;
  glb.scene;
  glb.scenes;
  glb.cameras;
  glb.asset;
  scene.add( glb.scene );


});*/




//Attempt to get the model loaded and make it move






const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200,5);
//scene.add(lightHelper,gridHelper);
//Listens to mouse dom events and updates the camera position
const controls = new OrbitControls(camera, renderer.domElement)

//const myGif = GIF();
//myGif.load("X5NY.gif");
//astronaut = ctx.drawImage(myGif.image,0,0);


function addStar(){
  const geometry = new THREE.SphereGeometry(.10,50,10);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z]= Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('Space.jpeg');
scene.background = spaceTexture;

const normalTexture = new THREE.TextureLoader().load('normal,jpg.jpeg');
const earthTexture = new THREE.TextureLoader().load('Earth.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1.5,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })

);
const marsTexture = new THREE.TextureLoader().load('8k_mars.jpeg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(1,32,32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture
  
  })

);

const jupiterTexture = new THREE.TextureLoader().load('maxresdefault.jpeg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(5.2,32,32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
    normalMap: normalTexture
  
  })

);
const saturnTexture = new THREE.TextureLoader().load('saturntext.jpeg');

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(4.5,32,32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
   // normalMap: normalTexture
  
  })

);







scene.add(earth);
scene.add(saturn)
scene.add(jupiter)
scene.add(mars)


torus.position.y = -1.4;
torus.position.x = .7;


jupiter.position.z = 30;
jupiter.position.setX(-5);

mars.position.z = 55;
mars.position.setX(-3);

earth.position.z =70;
earth.position.setX(-2);



function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  
  
  earth.rotation.x += .00;
  earth.rotation.y += .075;
  earth.rotation.z += .00;

  jupiter.rotation.x += .00;
  jupiter.rotation.y += .075;
  jupiter.rotation.z += .00;

  mars.rotation.x += .00;
  mars.rotation.y += .075;
  mars.rotation.z += .00;

  saturn.rotation.x += .00;
  saturn.rotation.y += .075;
  saturn.rotation.z = .0;



  camera.position.z = t * -.016;
  camera.position.x = t * -.0002;
  camera.position.y = t * -.0004;





}
document.body.onscroll = moveCamera


//infinite loop that call render method automatically
function animate(){
  requestAnimationFrame(animate);
  
  torus.rotation.x = .97;
  torus.rotation.y = .5;
  torus.rotation.z += .10;
  
  //earth.rotation.y +=.999;
  //earth.translateZ(.1);
  //earth.translateY(.1);

  //earth.translateX(1);
  //Changes reflected to the UI
  controls.update();



  renderer.render(scene,camera);
}
animate()


