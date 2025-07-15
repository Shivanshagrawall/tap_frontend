
Apologies for the late response — I saw your email only recently and had just about 2 hours left to complete the assignment. Given the limited time, I focused on ensuring that all three web APIs are implemented and functioning correctly. While the UI/UX may not be as refined as I would have liked, the entire code is working as intended. I’ve done my best within the timeframe and appreciate your understanding. Looking forward to your feedback.

# Eco-Reporter Application

A modern web application designed to empower users to easily report local environmental issues by capturing and annotating evidence on the go. This project was built as a technical assignment for the Frontend Developer Internship at Tap Invest.

**Live Demo:** [https://tap-frontend-assignment-gj1rbu2fx-shivansh-agrawals-projects.vercel.app/](https://tap-frontend-assignment-gj1rbu2fx-shivansh-agrawals-projects.vercel.app/) *(Replace with your actual Vercel or Render URL)*

---

## Project Objective

The primary objective of this assignment was to build a functional, real-world application by deeply integrating a minimum of three distinct Web APIs from a provided list. The goal was to demonstrate not only the ability to use these APIs but also to combine them thoughtfully to solve a practical problem.

---

## Core Technologies & Web APIs Used

This project was built with a modern, professional tech stack to ensure a fast, reliable, and maintainable application.

### Tech Stack
*   **Framework:** Next.js (with App Router)
*   **Library:** React
*   **Styling:** Tailwind CSS

### Web APIs Implemented

*   **[Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API):** To pinpoint the exact location of an environmental issue.
*   **[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API):** To allow users to draw on uploaded images, providing visual context and highlighting specific problem areas.
*   **[Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API):** To inform the user about their current network quality and to provide contextual data upon submission.

---

## How the Web APIs Work Together

The strength of this application lies in how the three APIs are integrated to create a seamless user workflow from start to finish.

### 1. Geolocation API: Pinpointing the "Where"
*   **How it Works:** When the user clicks the "Get My Current Location" button, the application calls `navigator.geolocation.getCurrentPosition()`.
*   **Integration:** The browser prompts the user for permission. If granted, the latitude and longitude coordinates are captured and stored in the component's state using `useState`.
*   **User Feedback:** The UI immediately updates to show the user's location has been successfully detected, providing instant confirmation.

### 2. Canvas API: Adding Visual Context
*   **How it Works:** The Canvas API provides a powerful way to add details that a simple photo cannot convey.
*   **Integration:**
    1.  A user selects an image using the `<input type="file">`.
    2.  The `FileReader` API reads the file, and its data is used to create a new `Image` object.
    3.  This image is then drawn onto the `<canvas>` element using `ctx.drawImage()`.
    4.  The application listens for mouse events (`onMouseDown`, `onMouseMove`, `onMouseUp`) on the canvas, allowing the user to draw directly on top of the uploaded image.
    5.  Upon submission, `canvas.toDataURL()` is called to capture the entire canvas (the original image plus the user's drawings) as a single Base64 encoded JPEG image.

### 3. Network Information API: Enhancing User Awareness
*   **How it Works:** This API provides information about the device's current network connection.
*   **Integration:**
    1.  Using a `useEffect` hook that runs once when the component mounts, the application checks for `navigator.connection`.
    2.  It reads the `effectiveType` (e.g., '4g') and `downlink` speed and displays this information in a dedicated "Network Status" panel.
    3.  An event listener is attached to update this information in real-time if the user's network connection changes (e.g., they move from Wi-Fi to cellular).
    4.  This information is also included in the final submitted report data.

---

## Key Features

*   **Issue Description:** A clear, responsive text area for users to describe the problem.
*   **One-Click Geolocation:** Instantly fetch and display the user's current coordinates.
*   **Image Upload and Annotation:** Upload a photo and draw on it with the mouse to highlight important details.
*   **Live Network Status:** See the current network type and speed, which updates dynamically.
*   **Form Submission:** All collected data (text, location, network status, and annotated image) is consolidated into a single JavaScript object and logged to the console, simulating a real API submission.
*   **User Feedback:** Clear status messages for location detection and report submission.

---

## How to Run This Project Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shivanshagrawall/tap_frontend.git
    ```

2.  **Navigate into the project directory:**
    ```bash
    cd tap_frontend
    ```

3.  **Install the necessary dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the application running.

---
Thank you for the opportunity to work on this assignment.```
