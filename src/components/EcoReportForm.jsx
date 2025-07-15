"use client";
import React, { useEffect, useRef, useState } from "react";

// Eco Report Form Component 
const EcoReporterForm = () => {
  // Declarartion of the state variables
  const [networkInformation, setNetworkInformation] = useState(
    "Finding the Network Information"
  );
  const [issueDescription, setIssueDescription] = useState("");
  const [geolocationData, setGeolocationData] = useState({
    lat: null,
    lon: null,
    status: "Not requested. Please Click the button to get location.",
  });
  const [submissionMessage, setSubmissionMessage] = useState("");

  //   Function that gives the current location in latitute and longitute
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeolocationData({ ...geolocationData, status: "Not supported by browser." });
      return;
    }

    setGeolocationData({ ...geolocationData, status: "Detection" });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocationData({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          status: "Location detected successfully!",
        });
      },
      (error) => {
        setGeolocationData({ ...geolocationData, status: `Failed to get Location` });
      }
    );
  };

  //   Initialization of variables for canvas drawing
  const canvasRef=useRef(null);
  const isDrawing=useRef(false);
  const lastPosition=useRef({x:0, y:0});

  // Function to get the photo and draw canvas on it
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Function to start drawing with the help of canvas
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    isDrawing.current = true;
    lastPosition.current = { x: offsetX, y: offsetY };
  };

  //   Function to draw on canvas
  const draw = ({ nativeEvent }) => {
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPosition.current.x, lastPosition.current.y);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    lastPosition.current = { x: offsetX, y: offsetY };
  };

  //   Function to stop drawing on canvas
  const stopDrawing = () => {
    isDrawing.current = false;
  };

  //   Function to handle form submission and display it the result into console 
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionMessage("");

    if (!issueDescription || !geolocationData.lat) {
      setSubmissionMessage("Please fill the description and location");
      return;
    }

    const imageFormat ='image/jpeg';
    const imageQuality=0.8;
    const canvas = canvasRef.current;
    const imageDataUrl = canvas.toDataURL(imageFormat, imageQuality);

    const reportData = {
      issueDescription,
      geolocationData: {
        latitude: geolocationData.lat,
        longitude: geolocationData.lon,
      },
      networkInformation,
      annotedImage: imageDataUrl,
    };

    console.log("Report Data: ", reportData);
    setSubmissionMessage(
      "Report submitted successfully! Check the console for data submitted."
    );

    alert("Report sucessfully submitted");
  };

  //   Use Effect to get network information at current time and updates when the network change
  useEffect(() => {
    if ("connection" in navigator) {
      const updateNetworkInfo = () => {
        const conn = navigator.connection;
        setNetworkInformation(
          `Connection: ${conn.effectiveType}, Speed: ${conn.downlink} Mpbs`
        );
      };
      updateNetworkInfo();
      navigator.connection.addEventListener("change", updateNetworkInfo);

      return () => {
        navigator.connection.removeEventListener("change", updateNetworkInfo);
      };
    } else {
      ("Network Information API not supported.");
    }
  }, []);

  //   Render the Eco Reporter Form into homepage
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full text-black p-4 rounded-2xl"
    >
      {/* Issues Section */}
      <div>
        <h3 className="font-bold text-2xl">1. Describe the Issues in details</h3>
        <textarea
          className="w-full h-24 p-2 resize-none border border-gray-300 rounded-2xl mt-2"
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          name="issues"
          id="issues_box"
          placeholder="e.g., A large pothole is causing traffic issues."
          required
        ></textarea>
      </div>

      {/* Location Section */}
      <div>
        <h3 className="font-bold text-2xl mt-4">2. Pinpoint your location in longitute & latitute</h3>
        <button
          className="w-full mt-2 bg-green-500 h-9 rounded-xl text-white hover:bg-green-600 cursor-pointer"
          onClick={handleGetLocation}
        >
          Get My Current Location
        </button>
        <div className="w-full mt-5 bg-gray-200 p-2 rounded-xl">
          <p>
            Status: {geolocationData.status}
            {geolocationData.lat &&
              `   (Latitute: ${geolocationData.lat.toFixed(
                4
              )}, Longitutue: ${geolocationData.lon.toFixed(4)})`}
          </p>
        </div>
      </div>

      {/* Add Photo Section */}
      <div>
        <h3 className="font-bold text-2xl mt-4">3. Add Image & Annotate it</h3>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="cursor-pointer"
        />
        <p>After uploading, draw on the image to highlight the issue.</p>
        <div className="border-2 border-dashed border-gray-300 mt-2">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
        </div>
      </div>

      {/* Network Section */}
      <div className="bg-gray-200 mt-4 p-2 rounded">
        <h4 className="font-bold">Current Network Status</h4>
        <p>{networkInformation}</p>
      </div>

      {/* Submit Button */}
      <button className="w-full mt-3 bg-blue-500 text-white  p-2 rounded hover:bg-blue-600 cursor-pointer ">
        Submit Final Report
      </button>

      {/* Submition Section */}
      <div className="w-full mt-4 p-2 bg-gray-200 rounded flex justify-center items-center">
        {submissionMessage && (
          <p
            className={
              submissionMessage == "Please fill the description and location"
                ? ""
                : "text-green-500"
            }
          >
            {submissionMessage}
          </p>
        )}
      </div>
    </form>
  );
};

export default EcoReporterForm;
