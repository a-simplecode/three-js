import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from '../GLTFLoader';

export default function WalkOnTheRoad() {
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cameraZ = -66;
    const cameraX = 32;
    const cameraY = 2;
    const cameraPosY = -180.1;

    const loader = new GLTFLoader();
    const road_url = '3DModels/road_highway/scene.gltf';
    const car_url = '3DModels/porsh/scene.gltf';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGL1Renderer({
      canvas: document.getElementById('bg'),
    });

    const light = new THREE.DirectionalLight(0x404040, 30); // soft white light
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(light, pointLight, ambientLight);

    // const controls = new OrbitControls(camera, renderer.domElement);
    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(lightHelper, gridHelper);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.position.x = cameraX;
    camera.position.z = cameraZ;
    camera.position.y = cameraY;
    camera.rotation.y = cameraPosY;

    renderer.setClearColor(0x404040, 0);

    loader.load(road_url, (gltf) => {
      let road = gltf.scene;
      road.position.y = -0.7;

      scene.add(road);
    });

    loader.load(car_url, (gltf) => {
      let car = gltf.scene;
      car.position.x = 24;
      car.position.z = -60;
      car.rotation.y = -0.8;

      scene.add(car);
    });
    setInterval(() => {
      renderer.render(scene, camera);
    }, 100 / 6);

    const spaceTextture = new THREE.TextureLoader().load('space.jpg');
    scene.background = spaceTextture;

    function moveCamera() {
      const t = document.body.getBoundingClientRect().top;

      //   camera.position.z = t * 0.01 + cameraZ;
      camera.position.x = t * 0.01 + cameraX;
      camera.rotation.y = cameraPosY - t * 0.001;
    }
    document.body.onscroll = moveCamera;
  }, []);

  return (
    <div
      style={{
        height: '5000px',
      }}
    >
      <canvas
        id="bg"
        style={{
          backgroundColor: 'white',
        }}
      ></canvas>
    </div>
  );
}
