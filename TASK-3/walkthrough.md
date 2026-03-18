# E-Commerce Project Walkthrough

## Overview
Successfully built a complete MERN-stack e-commerce project with premium UI elements, user authentication, and a full checkout flow. 

## Features Implemented
1. **Premium Aesthetic UI**: Integrated Google Fonts (Inter) and custom CSS variables for a modern, flat, and engaging design system.
2. **Product Browsing**: 
   - [HomeScreen](file:///d:/SQTS/TASK-3/frontend/src/screens/HomeScreen.jsx#5-66): Displays list of products.
   - [ProductScreen](file:///d:/SQTS/TASK-3/frontend/src/screens/ProductScreen.jsx#5-120): Detailed view of a single product with quantity selection.
3. **Cart Flow**: 
   - `CartContext` & [CartScreen](file:///d:/SQTS/TASK-3/frontend/src/screens/CartScreen.jsx#5-76): Used React Context and LocalStorage to manage cart items and compute dynamic totals.
4. **User Authentication**:
   - `AuthContext`: Manages JWT tokens, registration, login, and logout.
   - [LoginScreen](file:///d:/SQTS/TASK-3/frontend/src/screens/LoginScreen.jsx#5-73) & [RegisterScreen](file:///d:/SQTS/TASK-3/frontend/src/screens/RegisterScreen.jsx#5-109): Authentic validation and user creation interfaces.
5. **Checkout Process**:
   - [CheckoutScreen](file:///d:/SQTS/TASK-3/frontend/src/screens/CheckoutScreen.jsx#5-83) (Shipping): Captures user shipping details.
   - [PlaceOrderScreen](file:///d:/SQTS/TASK-3/frontend/src/screens/PlaceOrderScreen.jsx#5-106): Computes item costs, calculates tax & shipping, and provides an order summary review.
6. **Admin Dashboard**:
   - [AdminScreen](file:///d:/SQTS/TASK-3/frontend/src/screens/AdminScreen.jsx#6-93): Allows an `isAdmin` user to view, edit (simulated), and delete (simulated) products.

## How to Verify Locally
1. **Start the Backend**:
   - Navigate to `backend/` and run `npm run dev`.
   - The backend runs on port 5000, connected to a local MongoDB instance.
2. **Start the Frontend**:
   - Navigate to `frontend/` and run `npm run dev`.
   - The frontend Vite server runs on port 5173 and proxies `/api` requests to `localhost:5000`.
3. **Explore**:
   - Browse the dummy product listings on the homepage.
   - Add items to the cart and view the cart summary page.
   - Register a new user and login. Ensure the navigation bar updates to reflect your logged-in status.
   - Complete the simulated checkout process sequence (Cart -> Login -> Checkout -> Place Order).
   - If your user is an admin, navigate to the Admin Dashboard via the header dropdown link.

## Conclusion
The application architecture is modular and uses modern React patterns (Hooks, Context, Router v6). The design adheres to high-quality frontend standard practices ensuring the UI "wows" the user right away.
