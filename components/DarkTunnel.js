import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function One() {
  useEffect(() => {
    const cameraZ = 60;
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
    camera.position.setZ(cameraZ);

    // const controls = new OrbitControls(camera, renderer.domElement);
    // const lightHelper = new THREE.PointLightHelper(pointLight);
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(lightHelper, gridHelper);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: '#FF6347',
      wireframe: true,
    });
    const material2 = new THREE.MeshBasicMaterial({
      color: '#f5051d',
      wireframe: true,
    });
    const material3 = new THREE.MeshBasicMaterial({
      color: '#2434e0',
      wireframe: true,
    });

    const torus = new THREE.Mesh(geometry, material);
    torus.position.x = 15;
    torus.position.z = 20;
    scene.add(torus);

    const torus2 = new THREE.Mesh(geometry, material2);
    torus2.position.x = -70;
    torus2.position.y = -30;
    scene.add(torus2);

    const torus3 = new THREE.Mesh(geometry, material3);
    torus3.position.x = 70;
    torus3.position.y = 30;
    scene.add(torus3);

    const geometryKnot = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const materialKnot = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const torusKnot = new THREE.Mesh(geometryKnot, materialKnot);
    torusKnot.position.x = -20;
    torusKnot.position.z = -10;
    scene.add(torusKnot);

    const geometry3 = new THREE.SphereGeometry(100, 100, 100);
    const wireframe = new THREE.WireframeGeometry(geometry3);
    const line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
    scene.add(line);

    const geometry4 = new THREE.SphereGeometry(15, 32, 16);
    const material4 = new THREE.MeshBasicMaterial({
      color: 0x11f711,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry4, material4);
    sphere.position.x = 0;
    sphere.position.z = -30;
    scene.add(sphere);

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
    }
    Array(200).fill().forEach(addStar);

    // const spaceTextture = new THREE.TextureLoader().load('space.jpg');
    // scene.background = spaceTextture;

    function moveCamera() {
      const t = document.body.getBoundingClientRect().top;

      camera.position.z = t * 0.01 + cameraZ;
    }
    document.body.onscroll = moveCamera;

    setInterval(() => {
      torus.rotation.x += 0.02;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      torus2.rotation.x += 0.002;
      torus2.rotation.y += 0.0005;
      torus2.rotation.z += 0.001;

      torus3.rotation.x += 0.001;
      torus3.rotation.y += 0.0005;
      torus3.rotation.z += 0.002;

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.01;
      torusKnot.rotation.z += 0.02;

      sphere.rotation.x += 0.02;
      sphere.rotation.y += 0.005;
      renderer.render(scene, camera);
    }, 100 / 6);
  }, []);

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
