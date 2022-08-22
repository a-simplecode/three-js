import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from '../GLTFLoader';

export default function One() {
  const scroll = useRef(0);
  useEffect(() => {
    AnimationLoad();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    scroll.current = window.scrollY;
    // console.log(scroll.current);
  };

  const AnimationLoad = () => {
    const loader = new GLTFLoader();
    const url = '3DModels/porsh/scene.gltf';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGL1Renderer({
      canvas: document.getElementById('bg'),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(10);
    camera.position.setY(10);
    camera.position.setX(0);
    camera.rotateX(-Math.PI / 2);

    const light = new THREE.DirectionalLight(0x404040, 30); // soft white light
    const ambiant = new THREE.AmbientLight(0x404040, 2);
    scene.add(light, ambiant);

    renderer.setClearColor(0x404040, 0);
    loader.load(url, (gltf) => {
      let car1 = gltf.scene;
      let car2 = new THREE.Object3D().copy(car1);
      let car3 = new THREE.Object3D().copy(car1);
      car1.position.x = -4;
      car2.position.x = 4;
      car2.position.z = -10;
      car3.position.z = -50;
      console.log('gltf.scene', gltf.scene);
      scene.add(car1);
      scene.add(car2);
      scene.add(car3);

      setInterval(() => {
        if (camera.position.y > 2) {
          camera.position.setY(camera.position.y - 0.05);
          if (camera.rotation.x < -Math.PI / 15) {
            camera.rotateX(0.0078);
          }
        } else {
          car1.rotation.y += 0.005;
          car2.rotation.y -= 0.005;
          camera.position.setZ(
            scroll.current ? -scroll.current / 140 + 10 : 10
          );
          car3.position.z = scroll.current ? scroll.current / 60 - 50 : -50;
        }
        renderer.render(scene, camera);
      }, 100 / 6);
    });
  };
  return (
    <div
      style={{
        height: '5000px',
        overflowY: 'scroll',
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
