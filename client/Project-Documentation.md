
## Project Documentation 

# Custom T-Shirt E-Commerce Platform - Project Report

## Project Overview

This project is a MERN stack application that allows users to design and order custom T-shirts. The platform includes user authentication, product customization, cart functionality, and an admin dashboard for managing products.

## Functionalities Implemented

### User Side Features

1. **Authentication System**
   - JWT-based user registration and login
   - Password reset functionality
   - Protected routes for authenticated users

2. **T-Shirt Customization**
   - Base T-shirt selection from available products
   - Text customization (font, size, color, position)
   - Real-time preview of customized design

3. **Shopping Cart**
   - Add/remove customized designs


### Admin Side Features

1. **Product Management**
   - CRUD operations for base T-shirt products
   - Category management
   - Image upload 

2. **Category Management**
   - View all categories with filters
   - Updates and Delete Category


## Technical Implementation

### Frontend
- React.js with functional components and hooks
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing

### Database Schema
- Users: Stores user credentials and profile information
- Products: Stores base T-shirt products and categories
- Designs: Stores user-created custom designs

## Challenges Faced and Solutions

1. **T-Shirt Customization Preview**
   - Challenge: Implementing a real-time preview that accurately reflects the customizations
   - Solution: Used HTML Canvas to dynamically render the T-shirt with user-added elements

2. **Cart Persistence**
   - Challenge: Maintaining cart items for logged-out users
   - Solution: Used localStorage for guest users and synchronized with database upon login

4. **Admin Authorization**
   - Challenge: Implementing role-based access control
   - Solution: Added an 'isAdmin' flag to user model and middleware to verify admin status

## Future Enhancements

1. Payment gateway integration
2. Email notifications for order updates
3. Social media sharing of designs
4. User rating and review system

## Conclusion

This project successfully implements a full-featured custom T-shirt e-commerce platform using the MERN stack. It demonstrates proficiency in full-stack development, including authentication, database management, and complex user interactions.