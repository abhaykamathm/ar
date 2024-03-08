import React, { useRef, useEffect, useState } from "react";

const ARCamera = () => {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const constraints = { video: true };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleOverlayDrag = (event) => {
    // Calculate new position based on drag event
    const newX = overlayPosition.x + event.movementX;
    const newY = overlayPosition.y + event.movementY;
    setOverlayPosition({ x: newX, y: newY });
  };

  const handleZoom = (event) => {
    // Adjust zoom level based on user input (e.g., pinch gesture)
    const scaleFactor = 0.1; // Adjust the scale factor as needed
    const newZoom = zoom + (event.deltaY > 0 ? -scaleFactor : scaleFactor); // Increase or decrease zoom based on scroll direction
    setZoom(Math.max(0.1, newZoom)); // Ensure zoom level is within reasonable bounds
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "100%" }}
      />
      <img
        ref={overlayRef}
        src="/abhay.png"
        alt="Overlay Image"
        style={{
          position: "absolute",
          left: overlayPosition.x,
          top: overlayPosition.y,
          transform: `scale(${zoom})`,
          // Add other styles as needed for sizing and positioning
        }}
        onMouseDown={(event) => {
          // Start dragging the overlay on mouse down
          overlayRef.current.addEventListener("mousemove", handleOverlayDrag);
        }}
        onMouseUp={() => {
          // Stop dragging the overlay on mouse up
          overlayRef.current.removeEventListener(
            "mousemove",
            handleOverlayDrag
          );
        }}
        onWheel={handleZoom}
      />
    </div>
  );
};

export default ARCamera;
