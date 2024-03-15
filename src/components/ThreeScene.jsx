import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = ({ imageUrl }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for transparent background

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Set clear color to black and clear alpha to 0
    canvasRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl, () => {
      // Adjust plane geometry scale according to the aspect ratio of the loaded image
      const aspectRatio = texture.image.width / texture.image.height;
      const width = 2; // Desired width of the plane geometry
      const height = width / aspectRatio;
      const geometry = new THREE.PlaneGeometry(width, height);

      // Improve texture filtering for better image quality
      // texture.minFilter = THREE.LinearFilter;
      // texture.magFilter = THREE.LinearFilter;
      texture.encoding = THREE.SRGBColorSpace; // Specify sRGB encoding

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      }); // Make material transparent
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = true;

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, [imageUrl]);

  return <div ref={canvasRef} />;
};

export default ThreeScene;
