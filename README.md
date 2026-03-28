# LuxeSaloon - Production-Ready Saloon Management System

LuxeSaloon is a high-performance, secure, and modern saloon management platform built for premium service providers.

## 🚀 Key Features
- **Smart Booking**: Conflict-aware scheduling with dynamic time-slot generation.
- **Admin Dashboard**: Real-time analytics, revenue tracking, and management tools.
- **Security First**: JWT-based RBAC, brute-force protection, and audit logs.
- **Optimized UI**: Responsive, glassmorphic design with Framer Motion animations.

## 🛠 Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion, Chart.js.
- **Backend**: Spring Boot, Spring Security (JWT), Spring Data JPA.
- **Database**: MySQL / MariaDB with automatic auditing and soft-deletes.

## 📦 Getting Started

### Backend
1. Build the project: `mvn clean package`
2. Run: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
3. API Docs: `http://localhost:8080/swagger-ui.html`

### Frontend
1. Install dependencies: `npm install`
2. Run development: `npm run dev`
3. Production build: `npm run build`

## 🔐 Security Features
- **JWT Authentication**: Secure tokens with refresh logic and role-based claims.
- **RBAC**: Multi-layered access control for ADMIN and USER roles.
- **Hardened Handshake**: Login throttling and secure header enforcement.

## 📈 Optimization History
This project underwent a 50-commit, 5-phase optimization plan covering:
1. Stabilization & Error Correction
2. Architectural Cleanup
3. Database Hardening
4. Security Hardening
5. Validation & Performance
