import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from '../GLTFLoader';

export default function WalkOnTheRoad() {
  const currentT = useRef(0);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cameraZ = 85;
    const cameraX = -9;
    const cameraY = 3;
    const cameraRotY = 0.1;
    const cameraRotX = -0.4;

    const carX = -9.5;
    const carZ = 80;
    const carY = 0.63;
    const carRotY = 59.75;

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
    camera.rotation.y = cameraRotY;
    camera.rotation.x = cameraRotX;

    renderer.setClearColor(0x404040, 0);

    loader.load(road_url, (gltf) => {
      let road = gltf.scene;
      road.position.z = -18;
      road.position.x = 10;
      road.rotation.y = 0;

      scene.add(road);
    });

    loader.load(car_url, (gltf) => {
      let car = gltf.scene;
      car.position.x = carX;
      car.position.z = carZ;
      car.position.y = carY;
      car.rotation.y = carRotY;

      scene.add(car);

      function moveCamera() {
        const t = document.body.getBoundingClientRect().top;

        car.position.z = t * 0.01 + carZ;
        camera.position.z = t * 0.01 + cameraZ;
        if (t > -3666) {
          car.position.x = t * 0.0007 + carX;
          camera.position.x = t * 0.0007 + cameraX;
        } else {
          if (t < currentT.current) {
            car.position.x += 0.01;
            camera.position.x += 0.01;
            car.rotation.y -= 0.005;
          } else {
            car.position.x -= 0.01;
            camera.position.x -= 0.01;
            car.rotation.y += 0.005;
          }
          // car.rotation.y = t * 0.00005 + carRotY;
        }
        currentT.current = t;
      }
      document.body.onscroll = moveCamera;
    });
    setInterval(() => {
      renderer.render(scene, camera);
    }, 100 / 6);

    const spaceTextture = new THREE.TextureLoader().load('space.jpg');
    scene.background = spaceTextture;
  }, []);

  return (
    <div
      style={{
        height: '50000px',
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
