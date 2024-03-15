import React, { useRef, useEffect } from "react";
import "./CameraBackground.css";

const CameraBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: {
          width: 1440,
          frameRate: 30,
          facingMode: "environment",
          resizeMode: "crop-and-scale",
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((error) => console.error("Error accessing the camera:", error));
    }
  }, []);

  return (
    <video ref={videoRef} autoPlay muted playsInline className="camera-video" />
  );
};

export default CameraBackground;
