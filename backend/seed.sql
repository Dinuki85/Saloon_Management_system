-- Phase 4: Database Cleanup & Seeding
-- LUXESALOON MANAGEMENT SYSTEM

-- 1. CLEANUP
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE appointments;
TRUNCATE TABLE payments;
TRUNCATE TABLE user_roles;
TRUNCATE TABLE staff;
TRUNCATE TABLE services;
TRUNCATE TABLE users;
TRUNCATE TABLE roles;
SET FOREIGN_KEY_CHECKS = 1;

-- 2. ROLES
INSERT INTO roles (id, name, created_at, updated_at) VALUES 
(1, 'ROLE_USER', NOW(), NOW()),
(2, 'ROLE_ADMIN', NOW(), NOW());

-- 3. ADMIN USER (Password: admin123)
-- BCrypt: $2a$10$8.UnVuG9TgHqyh9S.RqbduVnuJmXQ8Zq8/W8TuxJ90B.E1l6Q6HMu
INSERT INTO users (id, first_name, last_name, email, password, created_at, updated_at) VALUES 
(1, 'Admin', 'User', 'admin@luxesaloon.com', '$2a$10$8.UnVuG9TgHqyh9S.RqbduVnuJmXQ8Zq8/W8TuxJ90B.E1l6Q6HMu', NOW(), NOW());

INSERT INTO user_roles (user_id, role_id) VALUES (1, 2);

-- 4. STAFF (5 Stylists)
INSERT INTO staff (id, name, specialization, availability, deleted, created_at, updated_at) VALUES 
(1, 'Elena Rodriguez', 'Master Stylist & Colorist', 'Mon-Fri: 9AM - 6PM', 0, NOW(), NOW()),
(2, 'Marcus Smith', 'Barber & Beard Expert', 'Tue-Sat: 10AM - 7PM', 0, NOW(), NOW()),
(3, 'Sophia Chen', 'Skin Care Specialist', 'Wed-Sun: 9AM - 5PM', 0, NOW(), NOW()),
(4, 'James Wilson', 'Creative Director', 'Mon-Thu: 11AM - 8PM', 0, NOW(), NOW()),
(5, 'Isabella Rossi', 'Nail Artist', 'Daily: 10AM - 6PM', 0, NOW(), NOW());

-- 5. SERVICES (10 Premium Treatments)
INSERT INTO services (id, name, description, price, duration, deleted, created_at, updated_at) VALUES 
(1, 'Signature Haircut', 'Precision cut tailored to your face shape and style preference.', 65.00, 45, 0, NOW(), NOW()),
(2, 'Balayage & Glow', 'Hand-painted highlights for a natural, sun-kissed look.', 180.00, 150, 0, NOW(), NOW()),
(3, 'Deluxe Facial', 'Deep cleansing and hydration treatment for glowing skin.', 120.00, 60, 0, NOW(), NOW()),
(4, 'Gentleman Royale', 'Exclusive barbering session including hot towel shave.', 55.00, 45, 0, NOW(), NOW()),
(5, 'Silk Mani-Pedi', 'Luxurious nail care with organic oils and premium polish.', 85.00, 90, 0, NOW(), NOW()),
(6, 'Keratin Therapy', 'Smoothing treatment to eliminate frizz and add brilliant shine.', 250.00, 180, 0, NOW(), NOW()),
(7, 'Bridal Package', 'Complete hair and makeup session for your special day.', 350.00, 240, 0, NOW(), NOW()),
(8, 'Scalp Detox', 'Invigorating massage and mask for healthy hair growth.', 75.00, 30, 0, NOW(), NOW()),
(9, 'Lash Lift & Tint', 'Natural enhancement for fuller, darker-looking lashes.', 95.00, 60, 0, NOW(), NOW()),
(10, 'Aroma Massage', 'Therapeutic relaxation using essential oils of your choice.', 110.00, 60, 0, NOW(), NOW());
