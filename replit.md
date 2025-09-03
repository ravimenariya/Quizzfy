# replit.md

## Overview

Quizzfy is a full-stack quiz application that allows users to create, take, and manage quizzes across different categories. The system features user authentication, categorized quizzes with different difficulty levels, and an admin panel for content management. Users can browse public quizzes, create their own, and track their quiz-taking history.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with Vite build tool for fast development and optimized builds
- **Styling**: Tailwind CSS with dark mode support and custom scrollbar styling
- **Routing**: React Router DOM for client-side navigation
- **State Management**: React hooks and context (no external state management library detected)
- **Development**: ESLint for code quality, hot module replacement via Vite

### Backend Architecture
- **Framework**: Express.js with ES modules for modern JavaScript syntax
- **Database**: MongoDB with Mongoose ODM for schema definition and data validation
- **Authentication**: JWT (JSON Web Tokens) for stateless authentication with bcryptjs for password hashing
- **API Design**: RESTful API structure with controller-based architecture
- **Middleware**: CORS for cross-origin requests, Morgan for HTTP request logging
- **Environment**: Dotenv for configuration management

### Data Models
- **User Model**: Handles user registration, authentication, roles (user/admin), profile management, and quiz history tracking
- **Quiz Model**: Stores quiz content with questions, multiple choice options, explanations, difficulty levels, time limits, and ratings
- **Category Model**: Organizes quizzes into themed categories with icons and color coding
- **Question Schema**: Embedded within quizzes, supports multiple choice questions with correct answer marking and point values

### Security & Authorization
- **Role-based Access Control**: Separate permissions for regular users and administrators
- **Protected Routes**: Middleware-based authentication for sensitive operations
- **Password Security**: Bcrypt hashing with salt rounds for secure password storage
- **JWT Implementation**: Token-based authentication with 30-day expiration

### API Structure
- **Quiz Routes**: CRUD operations for quizzes, filtering by category/difficulty, search functionality, and rating system
- **User Routes**: Registration, login, profile management, and admin user listing
- **Category Routes**: Public access for browsing, admin-only creation and management
- **Pagination**: Built-in pagination support for quiz listings with configurable limits

## External Dependencies

### Backend Dependencies
- **Database**: MongoDB for document storage and Mongoose for object modeling
- **Authentication**: bcryptjs for password hashing, jsonwebtoken for JWT implementation
- **Server Framework**: Express.js with cors, morgan for logging, and dotenv for environment variables
- **Development**: nodemon for automatic server restarts during development

### Frontend Dependencies
- **Build Tools**: Vite for development server and build optimization
- **Styling**: Tailwind CSS with PostCSS and autoprefixer for CSS processing
- **Code Quality**: ESLint with React-specific plugins for code linting
- **Development**: Various loaders (css-loader, style-loader) for asset processing

### Development Tools
- **Database Seeding**: Custom seeder utility for populating initial data
- **Environment Configuration**: Support for development and production environments
- **Hot Reloading**: Both frontend (Vite HMR) and backend (nodemon) support automatic reloading