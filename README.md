# Vista Systech Task

## Overview

Vista Systech Task is a backend application designed to manage promotions, catalogs, shopping carts, and orders. This project is built using **Node.js**, **Express**, and **MongoDB**, and provides a set of RESTful API endpoints to handle operations related to product promotions, catalogs, cart management, and order processing. The application also provides **Swagger** API documentation for easy testing and exploration of the available endpoints.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [Promo Endpoints](#promo-endpoints)
  - [Catalog Endpoints](#catalog-endpoints)
  - [Cart Endpoints](#cart-endpoints)
  - [Order Endpoints](#order-endpoints)
- [Swagger Documentation](#swagger-documentation)
- [License](#license)

---

## Tech Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **JWT** (Authentication)
- **Bcrypt** (Password hashing)
- **Swagger** (API documentation)
- **TypeScript** (Static typing)
- **dotenv** (Environment variables)
- **Nodemailer** (Email service)

---

## Setup Instructions

### Step 1: Clone the Repository

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
Update the .env file with your environment-specific values.

Example .env:

env
Copy
NODE_ENV=development
SOCKET=8082
MONGODB_URL=mongodb://localhost:27017/Vista_systech_task_DB
PORT=8080
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION_TIME=365d
JWT_REFRESH_EXPIRATION_TIME=365d
JWT_RESET_PASSWORD_EXPIRATION_TIME=10m
JWT_VERIFY_EMAIL_EXPIRATION_TIME=10m
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=sayedhasan973@gmail.com
SMTP_PASSWORD=your-smtp-password
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

API Endpoints
Promo Endpoints
1. Create a Promo
Endpoint: /api/v1/promo/create

Method: POST

Request Body:

json
Copy
{
  "code": "VISTA SYS",
  "percent": 15
}
Response:

json
Copy
{
  "code": 200,
  "message": "Promo Created successfully.",
  "data": {
    "attributes": {
      "code": "VISTA SYS",
      "percent": 15,
      "_id": "68ab29670402183f51848079",
      "createdAt": "2025-08-24T15:01:59.964Z",
      "updatedAt": "2025-08-24T15:01:59.964Z",
      "__v": 0
    }
  }
}
2. Get All Promos
Endpoint: /api/v1/promo/get-all-promo

Method: GET

Response:

json
Copy
{
  "code": 200,
  "message": "Promo get successfully.",
  "data": {
    "attributes": [
      {
        "_id": "68ab29670402183f51848079",
        "code": "VISTA SYS",
        "percent": 15,
        "createdAt": "2025-08-24T15:01:59.964Z",
        "updatedAt": "2025-08-24T15:01:59.964Z",
        "__v": 0
      }
    ]
  }
}
Catalog Endpoints
1. Create a Catalog Item
Endpoint: /api/v1/catalog/create

Method: POST

Request Body:

json
Copy
{
  "name": "T-Shirt",
  "description": "Comfortable T-shirt.",
  "category": "Apparel",
  "variants": [
    {
      "size": "S",
      "color": "Blue",
      "price": 19.99
    },
    {
      "size": "M",
      "color": "Blue",
      "price": 21.99
    },
    {
      "size": "L",
      "color": "Blue",
      "price": 23.99
    }
  ]
}
Response:

json
Copy
{
  "code": 200,
  "message": "Catalog created successfully.",
  "data": {
    "attributes": {
      "_id": "68ab29670402183f51848079",
      "name": "T-Shirt",
      "description": "Comfortable T-shirt.",
      "category": "Apparel",
      "variants": [
        {
          "size": "S",
          "color": "Blue",
          "price": 19.99
        },
        {
          "size": "M",
          "color": "Blue",
          "price": 21.99
        },
        {
          "size": "L",
          "color": "Blue",
          "price": 23.99
        }
      ],
      "createdAt": "2025-08-24T15:01:59.964Z",
      "updatedAt": "2025-08-24T15:01:59.964Z",
      "__v": 0
    }
  }
}
Cart Endpoints
1. Add Item to Cart
Endpoint: /api/v1/cart/add-to-cart/:cartId

Method: POST

Request Body:

json
Copy
{
  "productId": "60f6b6b18a7e4cbb88d5feff",
  "variant": "M",
  "quantity": 5,
  "price": 21.99
}
Response:

json
Copy
{
  "code": 200,
  "message": "Cart Add Item Successfully.",
  "data": {
    "attributes": {
      "_id": "68ab224285f67d766a17239e",
      "items": [
        {
          "productId": "60f6b6b18a7e4cbb88d5feff",
          "quantity": 5,
          "variant": "M",
          "price": 21.99
        }
      ],
      "promoCode": "VISTA SYS Update",
      "subTotal": 185.92,
      "promoDiscountTotal": 33.98,
      "total": 219.90,
      "token": "a74db0e7-c2aa-4960-9795-60adc15f2ae9",
      "createdAt": "2025-08-24T15:36:48.006Z",
      "updatedAt": "2025-08-24T15:36:48.006Z",
      "__v": 1
    }
  }
}
Order Endpoints
1. Create an Order
Endpoint: /api/v1/order/create/:cartId

Method: POST

Request Body:

json
Copy
{
  "name": "Sayed",
  "address": "Dhaka Bangladesh",
  "phoneNumber": "01865536768"
}
Response:

json
Copy
{
  "code": 200,
  "message": "Order Submit Successfully.",
  "data": {
    "attributes": {
      "_id": "68ab335d50c22805fb8239d1",
      "items": [
        {
          "productId": "60f6b6b18a7e4cbb88d5feff",
          "quantity": 10,
          "variant": "M",
          "price": 21.99
        }
      ],
      "promoCode": "VISTA SYS Update",
      "subTotal": 125.95,
      "promoDiscountTotal": 33.98,
      "total": 91.96,
      "token": "a74db0e7-c2aa-4960-9795-60adc15f2ae9",
      "name": "Sayed",
      "address": "Dhaka Bangladesh",
      "phoneNumber": "01865536768",
      "status": "Pending",
      "createdAt": "2025-08-24T15:44:29.046Z",
      "updatedAt": "2025-08-24T15:44:29.046Z",
      "__v": 0
    }
  }
}
Swagger Documentation
You can view the full API documentation via Swagger at the following link:

Swagger UI - Vista Systech Task