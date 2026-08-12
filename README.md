#  (Canopy) - Client 💬

A modern, real-time messaging application frontend built to deliver seamless and instant communication. This repository contains the client-side code for Chat-hub, featuring a highly responsive UI and real-time event handling.

## 🚀 Tech Stack

*   **Framework:** React.js
*   **Styling:** Tailwind CSS & Framer Motion (for smooth UI animations)
*   **Real-time Communication:** Socket.io-client
*   **State Management:** React Context API / Redux (Update based on your exact implementation)
*   **Routing:** React Router DOM

## ✨ Key Features

*   **Real-Time Messaging:** Instant message delivery and reception using WebSocket connections via Socket.io.
*   **Modern UI/UX:** Clean, responsive design optimized for both desktop and mobile screens.
*   **User Authentication:** Secure login and registration flows.
*   **Online Presence:** Real-time online/offline status indicators for users.
*   **Typing Indicators:** Visual cues when another user is actively typing a message.

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/OmMaheshwari653/Canopy-client.git
    cd ./Canopy-client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your backend API and Socket URLs.
    ```env
    VITE_BACKEND_URL=http://localhost:5000/api
    VITE_SOCKET_URL=http://localhost:5000
    ```
    *(Note: Adjust the prefix to `REACT_APP_` if you are using Create React App instead of Vite).*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 📁 Folder Structure

```text
src/
├── assets/        # Static files like images and icons
├── components/    # Reusable UI components (Buttons, Modals, ChatBubbles)
├── context/       # Global state management (AuthContext, SocketContext)
├── hooks/         # Custom React hooks
├── pages/         # Page-level components (Login, ChatDashboard)
├── services/      # API calls and Socket event listeners
├── utils/         # Helper functions and constants
└── App.jsx        # Main application entry point
