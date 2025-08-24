import mongoose from "mongoose";
import { CartModel } from "../app/modules/cart/cart.model";
import { CatalogModel } from "../app/modules/catalog/catalog.model";
import { OrderModel } from "../app/modules/order/order.model";
import { PromoModel } from "../app/modules/promo/promo.model";
import { v4 as uuidv4 } from 'uuid';

// Sample Promo Data (10 entries)
const promoData = [
  { code: "VISTA SYS", percent: 15 },
  { code: "SUMMER SALE", percent: 10 },
  { code: "WINTER DISCOUNT", percent: 20 },
  { code: "HOLIDAY SPECIAL", percent: 25 },
  { code: "BACKTOSCHOOL", percent: 30 },
  { code: "SPRINGFLING", percent: 10 },
  { code: "EASTERBONUS", percent: 5 },
  { code: "VIPDISCOUNT", percent: 40 },
  { code: "BOGOFFER", percent: 50 },
  { code: "NEWYEAR2025", percent: 15 },
];

// Sample Catalog Data (10 entries)
const catalogData = [
  { name: "T-Shirt", description: "Comfortable T-shirt.", category: "Apparel", variants: [{ size: "S", color: "Blue", price: 19.99 }, { size: "M", color: "Blue", price: 21.99 }, { size: "L", color: "Blue", price: 23.99 }] },
  { name: "Jeans", description: "Stylish denim jeans.", category: "Apparel", variants: [{ size: "S", color: "Black", price: 29.99 }, { size: "M", color: "Black", price: 31.99 }, { size: "L", color: "Black", price: 33.99 }] },
  { name: "Jacket", description: "Warm winter jacket.", category: "Apparel", variants: [{ size: "S", color: "Gray", price: 49.99 }, { size: "M", color: "Gray", price: 51.99 }, { size: "L", color: "Gray", price: 53.99 }] },
  { name: "Sneakers", description: "Comfortable running shoes.", category: "Footwear", variants: [{ size: "8", color: "White", price: 59.99 }, { size: "9", color: "White", price: 61.99 }, { size: "10", color: "White", price: 63.99 }] },
  { name: "Sweater", description: "Cozy wool sweater.", category: "Apparel", variants: [{ size: "S", color: "Red", price: 39.99 }, { size: "M", color: "Red", price: 41.99 }, { size: "L", color: "Red", price: 43.99 }] },
  { name: "Hat", description: "Stylish baseball hat.", category: "Accessories", variants: [{ size: "One Size", color: "Black", price: 19.99 }] },
  { name: "Socks", description: "Comfortable cotton socks.", category: "Accessories", variants: [{ size: "One Size", color: "White", price: 5.99 }] },
  { name: "Watch", description: "Luxury wristwatch.", category: "Accessories", variants: [{ size: "One Size", color: "Gold", price: 199.99 }] },
  { name: "Belt", description: "Leather belt.", category: "Accessories", variants: [{ size: "M", color: "Brown", price: 29.99 }] },
  { name: "Shorts", description: "Summer shorts.", category: "Apparel", variants: [{ size: "S", color: "Green", price: 14.99 }, { size: "M", color: "Green", price: 16.99 }, { size: "L", color: "Green", price: 18.99 }] },
];

// Sample Cart Data (10 entries)
const cartData = [
  { items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 1, variant: "M", price: 21.99 }], promoCode: "SUMMER SALE", subTotal: 21.99, promoDiscountTotal: 2.20, total: 19.79, token: uuidv4() },
  { items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 2, variant: "S", price: 19.99 }], promoCode: "WINTER DISCOUNT", subTotal: 39.98, promoDiscountTotal: 8.00, total: 31.98, token: uuidv4() },
  { items: [{ productId: "60f6b6b18a7e4cbb88d5fefd", quantity: 1, variant: "L", price: 23.99 }], promoCode: "HOLIDAY SPECIAL", subTotal: 23.99, promoDiscountTotal: 6.00, total: 17.99, token: uuidv4() },
  { items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 3, variant: "M", price: 21.99 }], promoCode: "BACKTOSCHOOL", subTotal: 65.97, promoDiscountTotal: 15.00, total: 50.97, token: uuidv4() },
  { items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 2, variant: "S", price: 19.99 }], promoCode: "SPRINGFLING", subTotal: 39.98, promoDiscountTotal: 3.99, total: 35.99, token: uuidv4() },
  { items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 5, variant: "L", price: 23.99 }], promoCode: "EASTERBONUS", subTotal: 119.95, promoDiscountTotal: 10.00, total: 109.95, token: uuidv4() },
  { items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 1, variant: "S", price: 19.99 }], promoCode: "VIPDISCOUNT", subTotal: 19.99, promoDiscountTotal: 10.00, total: 9.99, token: uuidv4() },
  { items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 2, variant: "M", price: 21.99 }], promoCode: "BOGOFFER", subTotal: 43.98, promoDiscountTotal: 21.99, total: 21.99, token: uuidv4() },
  { items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 3, variant: "S", price: 19.99 }], promoCode: "NEWYEAR2025", subTotal: 59.97, promoDiscountTotal: 9.00, total: 50.97, token: uuidv4() },
  { items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 1, variant: "M", price: 21.99 }], promoCode: "SUMMER SALE", subTotal: 21.99, promoDiscountTotal: 2.20, total: 19.79, token: uuidv4() },
];

// Sample Order Data (10 entries)
const orderData = [
  {
    items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 1, variant: "M", price: 21.99 }],
    promoCode: "SUMMER SALE",
    subTotal: 21.99,
    promoDiscountTotal: 2.20,
    total: 19.79,
    token: uuidv4(),
    name: "John Doe",
    address: "123 Main St, City, Country",
    phoneNumber: "1234567890",
    status: "Pending",
  },
  {
    items: [{ productId: "60f6b6b18a7e4cbb88d5feff", quantity: 2, variant: "S", price: 19.99 }],
    promoCode: "WINTER DISCOUNT",
    subTotal: 39.98,
    promoDiscountTotal: 8.00,
    total: 31.98,
    token: uuidv4(),
    name: "Jane Smith",
    address: "456 Maple Ave, City, Country",
    phoneNumber: "9876543210",
    status: "Shipped",
  },
  // Add more similar sample data here (7 more orders)
];

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect("mongodb://localhost:27017/Vista_systech_task_DB");


    console.log("Connected to MongoDB");

    // Clear existing collections
    await PromoModel.deleteMany({});
    await CatalogModel.deleteMany({});
    await CartModel.deleteMany({});
    await OrderModel.deleteMany({});

    console.log("Cleared existing data");

    // Insert new data
    await PromoModel.insertMany(promoData);
    await CatalogModel.insertMany(catalogData);
    await CartModel.insertMany(cartData);
    await OrderModel.insertMany(orderData);

    console.log("Data inserted successfully");

    // Close the database connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error while seeding database:", err);
  }
};

// Run the seeder
seedDatabase();
