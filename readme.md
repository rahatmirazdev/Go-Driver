# 🚗 GoDriver: Car Rental System

Car Rental System is a comprehensive platform designed to simplify car rentals for users and streamline inventory management for providers. The system features user-friendly car booking, real-time updates on car availability, and efficient car inventory management.

## 🌄 Project Overview

The Car Rental System enables users to:

- Add, update, and delete cars for rental.
- Search for and book cars based on availability.
- Get real-time updates on car availability and booking statuses.

The platform emphasizes responsiveness, security, and an intuitive design for a seamless user experience.

## 🚀 Live Link

[Visit Car Rental System Live](https://godriveer.web.app/)

## 🔧 Main Technologies Used

- **React**: For building a dynamic and responsive user interface.
- **Node.js & Express.js**: For creating robust backend services.
- **MongoDB**: To store and manage car inventory and booking data.
- **Firebase Authentication**: For secure user registration and login.
- **Tailwind CSS**: A utility-first CSS framework for modern, responsive design.
- **React Toastify**: For displaying success and error notifications.
- **React Router**: For seamless navigation between pages.

## 🌟 Key Features

### 🔑 User Authentication

- Secure registration and login using email and password.
- Google sign-in for quick access.

### 🚗 Car Management

- Add new cars with details like model, price, availability, features, and image.
- Update or delete cars in your inventory.

### 📅 Booking System

- Search and book cars based on model, location, and availability.
- View detailed car information before booking.
- Modify or cancel bookings via a user-friendly interface.

### 🔍 Advanced Search & Sorting

- Search for cars by model or location.
- Sort cars by date added, price, or availability.

### 🔦 Responsive Design

- Fully responsive UI for a seamless experience on mobile, tablet, and desktop devices.

## 🛠️ Installation Guide

Follow these steps to run Car Rental System on your local machine:

1. Clone the repository:
    ```bash
    git clone https://github.com/rahatmirazdev/Go-Driver.git
    ```
2. Navigate to the project directory:
    ```bash
    cd GoDriver.git
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add your Firebase configuration and MongoDB credentials:
     ```plaintext
    VITE_API_KEY=your_api_key
    VITE_AUTH_DOMAIN=your_auth_domain
    VITE_PROJECT_ID=your_project_id
    VITE_STORAGE_BUCKET=your_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_messeging_sender_id
    VITE_APP_ID=your_app_id
     ```
5. Start the development server:
    ```bash
    npm run dev
    ```
6. Open your browser and visit `http://localhost:3000` to view the application.

## 📅 Dependencies

Here are the main dependencies used in the project:

- `react`
- `firebase`
- `mongodb`
- `tailwindcss`
- `react-toastify`
- `react-router-dom`

Simplify car rentals and manage inventory effortlessly with Car Rental System!
