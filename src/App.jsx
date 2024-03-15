import React, { useEffect } from "react";
import "./App.css";
import CameraBackground from "./components/CameraBackground";
import ThreeScene from "./components/ThreeScene";

function App() {
  return (
    <>
      <CameraBackground />
      <div id="three-container">
        <ThreeScene imageUrl="/painting.webp" />
      </div>
    </>
  );
}

export default App;
