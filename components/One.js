import { useEffect } from 'react';
import * as THREE from 'three';

export default function One() {
  useEffect(() => {
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
    camera.position.setZ(30);
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const geometry2 = new THREE.TorusGeometry(20, 1, 8, 100);
    const material = new THREE.MeshBasicMaterial({
      color: '#FF6347',
      wireframe: true,
    });
    const material2 = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      wireframe: true,
    });
    const torus = new THREE.Mesh(geometry, material);
    const torus2 = new THREE.Mesh(geometry2, material2);
    scene.add(torus);
    // scene.add(torus2);

    setInterval(() => {
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.02;
      renderer.render(scene, camera);
    }, 100 / 6);
  }, []);

  function animate() {
    requestAnimationFrame(animate);
  }

  return (
    <div>
      <canvas id="bg"></canvas>
    </div>
  );
}
