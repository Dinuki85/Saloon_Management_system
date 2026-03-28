# Saloon Management System

A full-stack salon management system built with Next.js (Frontend) and Spring Boot (Backend).

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS
- **Backend**: Spring Boot 3, Spring Security, JWT
- **Database**: MySQL

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Create a MySQL database named `saloon_db`.
3. Update `src/main/resources/application.properties` with your MySQL credentials.
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Modern, responsive UI.
- JWT-based authentication (Login/Register).
- Clean architecture (Controller -> Service -> Repository).
- Role-based access control (pre-configured).
