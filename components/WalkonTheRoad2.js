import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from '../GLTFLoader';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';
import * as YUKA from 'yuka';
import RoadPath from '../paths/RoadPath.json';

export default function WalkOnTheRoadTwo() {
  const currentT = useRef(0);
  const vectors = useRef([]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const loader = new GLTFLoader();
    const road_url = '3DModels/scifi_road/road.gltf';
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

    const controls = new OrbitControls(camera, renderer.domElement);
    // const lightHelper = new THREE.PointLightHelper(pointLight);
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(lightHelper, gridHelper);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    renderer.setClearColor(0x404040, 0);

    loader.load(road_url, (gltf) => {
      let road = gltf.scene;
      road.scale.set(0.3, 0.3, 0.3);
      road.position.x = 0;
      road.position.y = -16.7; //-17.7
      road.rotation.y = 0;

      scene.add(road);
    });

    const vehicleGeometry = new THREE.ConeBufferGeometry(0.1, 0.5, 8);
    vehicleGeometry.rotateX(Math.PI * 0.5);
    const vehicleMaterial = new THREE.MeshNormalMaterial();
    const vehicleMesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial);
    scene.add(vehicleMesh);

    const vehicle = new YUKA.Vehicle();

    loader.load(car_url, (gltf) => {
      let car = gltf.scene;
      const carClone = SkeletonUtils.clone(car);
      carClone.matrixAutoUpdate = false;

      scene.add(carClone);
      carClone.add(camera);
      camera.position.y = 3;
      camera.position.z = -5;
      camera.rotation.y = Math.PI;
      camera.rotation.x = Math.PI / 5;
      carClone.position.x = 0;
      carClone.position.y = 0;
      carClone.position.z = 0;

      setInterval(() => {
        window.onkeydown = function (e) {
          if (e.key == 'w') carClone.position.z += 1;

          if (e.key == 's') carClone.position.z -= 1;

          if (e.key == 'a') carClone.position.x += 1;

          if (e.key == 'd') carClone.position.x -= 1;

          if (e.key == 'q') carClone.position.y += 1;

          if (e.key == 'e') carClone.position.y -= 1;

          if (e.key == 'k')
            console.log('vectors.current', JSON.stringify(vectors.current));
        };

        window.onkeyup = function (e) {
          vectors.current.push({
            z: carClone.position.z,
            x: carClone.position.x,
            y: carClone.position.y,
          });
        };
      }, 100 / 6);
      vehicle.setRenderComponent(carClone, sync);
    });

    function sync(entity, renderComponent) {
      renderComponent.matrix.copy(entity.worldMatrix);
    }

    const path = new YUKA.Path();
    path.add(new YUKA.Vector3(0, 0, 0));
    RoadPath.map((vector) =>
      path.add(new YUKA.Vector3(vector.x, vector.y, vector.z))
    );

    path.loop = true;

    vehicle.position.copy(path.current());

    //vehicle.maxSpeed = 3;

    const followPathBehavior = new YUKA.FollowPathBehavior(path, 1);
    vehicle.steering.add(followPathBehavior);

    const onPathBehavior = new YUKA.OnPathBehavior(path);
    onPathBehavior.radius = 0.1;
    vehicle.steering.add(onPathBehavior);

    const entityManager = new YUKA.EntityManager();
    entityManager.add(vehicle);

    const position = [];
    for (let i = 0; i < path._waypoints.length; i++) {
      const waypoint = path._waypoints[i];
      position.push(waypoint.x, waypoint.y, waypoint.z);
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(position, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const lines = new THREE.LineLoop(lineGeometry, lineMaterial);
    scene.add(lines);

    const time = new YUKA.Time();

    function animate() {
      const delta = time.update().getDelta();
      entityManager.update(delta * 10);

      renderer.render(scene, camera);
    }

    setInterval(() => {
      animate();
    }, 100 / 6);
    // renderer.setAnimationLoop(animate);

    const spaceTextture = new THREE.TextureLoader().load('space.jpg');
    // scene.background = spaceTextture;
  }, []);

  return (
    <div>
      <canvas
        id="bg"
        style={{
          backgroundColor: 'white',
        }}
      ></canvas>
    </div>
  );
}
