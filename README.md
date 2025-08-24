# Vista Systech Task - Backend Application

## Overview
Vista Systech Task is a backend application designed to manage promotions, catalogs, shopping carts, and orders. This project is built using Node.js, Express, and MongoDB. It provides a set of RESTful API endpoints to handle operations related to product promotions, catalogs, cart management, and order processing. 

## Table of Contents
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Swagger Documentation](#swagger-documentation)
- [License](#license)

## Tech Stack
- **Node.js** - Backend runtime environment
- **Express.js** - Web framework for building RESTful APIs
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - Object Data Modeling (ODM) library for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing library
- **Swagger** - API documentation and testing
- **TypeScript** - Static typing for JavaScript
- **dotenv** - Environment variables management
- **Nodemailer** - Email service integration

## Setup Instructions

### Step 1: Clone the Repository
Clone the repository to your local machine.
```bash
git clone https://github.com/your-username/vista-systech-task.git
Step 2: Install Dependencies
Navigate to the project folder and install the necessary dependencies.

bash
Copy
cd vista-systech-task
npm install
Step 3: Set Up Environment Variables
Copy the .env.example file to create a new .env file.

bash
Copy
cp .env.example .env
Open the .env file and update it with your environment-specific values.

Example .env:
env
Copy
# Application Environment
NODE_ENV=development
SOCKET=8082
MONGODB_URL=mongodb://localhost:27017/Vista_systech_task_DB
PORT=8080
# BACKEND_IP=10.10.11.65
LOCAL_SERVER=sayed.sakibahmad.com
# JWT Configuration
JWT_SECRET=b7d4672a3e0324f4f3e79b91d4d8f2f5ad90d2e35106c6b8a42358dbdd846b88
JWT_EXPIRATION_TIME=365d
JWT_REFRESH_EXPIRATION_TIME=365d
JWT_RESET_PASSWORD_EXPIRATION_TIME=10m
JWT_VERIFY_EMAIL_EXPIRATION_TIME=10m
# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=12
# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=sayedhasan973@gmail.com
SMTP_PASSWORD=pzwq fjyi kacq nkif
EMAIL_FROM=sayedhasan973@gmail.com
Step 4: Run the Seeder
The seeder will populate the database with initial data for Promo, Catalog, Cart, and Order.

bash
Copy
npm run seed
Step 5: Run the Application
Start the development server:

bash
Copy
npm run dev
This will run the app on http://localhost:8080.

Environment Variables
The following environment variables should be set in the .env file:

NODE_ENV: Set to development or production.

SOCKET: Port number for the socket server (default: 8082).

MONGODB_URL: The URL for your MongoDB instance.

PORT: Port number for the backend server (default: 8080).

JWT_SECRET: Secret key for JWT authentication.

JWT_EXPIRATION_TIME: JWT token expiration time (default: 365d).

JWT_REFRESH_EXPIRATION_TIME: Refresh token expiration time (default: 365d).

JWT_RESET_PASSWORD_EXPIRATION_TIME: Expiration time for reset password token.

JWT_VERIFY_EMAIL_EXPIRATION_TIME: Expiration time for email verification token.

SMTP_HOST: SMTP server host (default: smtp.gmail.com).

SMTP_PORT: SMTP server port (default: 587).

SMTP_USERNAME: SMTP server username (your email).

SMTP_PASSWORD: SMTP server password (your email password).

EMAIL_FROM: The sender's email address.

Swagger Documentation
You can view the full API documentation via Swagger at the following link:

Swagger UI