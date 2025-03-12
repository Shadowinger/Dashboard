# Dashboard Project

This project is a simple **dashboard application** built with **Angular** for the frontend and **Node.js + Express** for the backend.

## Project Structure

```
Dashboard-projekt/
│── backend/
│   ├── data/
│   │   ├── database.json  # Mock database
│   ├── routes/
│   │   ├── users.js  # User-related API routes
│   ├── server.js  # Main backend server
│   ├── package.json  # Backend dependencies
│
│── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.ts/html/css  # Main dashboard UI
│   │   │   ├── user-list/
│   │   │   │   ├── user-list.component.ts/html/css  # User list display
│   │   │   ├── user-form/
│   │   │   │   ├── user-form.component.ts/html/css  # User input form
│   │   ├── services/
│   │   │   ├── api.service.ts  # Handles API communication
│   ├── app.component.ts/html  # Root component
│   ├── app.module.ts  # Angular module configuration
│   ├── styles.css  # Global styles
│
│── node_modules/  # Installed dependencies
│── angular.json  # Angular project config
│── package.json  # Project dependencies
│── package-lock.json  # Dependency lock file
│── Images/  # Screenshots & assets
```

## Setup Instructions

### 1. Install Dependencies
Run the following command in both the `backend/` and `frontend/` folders:
```sh
npm install
```

### 2. Start the Backend Server
Navigate to the `backend/` folder and run:
```sh
node server.js
```
This will start an Express.js server.

### 3. Start the Angular Frontend
Navigate to the `frontend/` folder and run:
```sh
ng serve
```
The Angular app will be available at `http://localhost:4200/`.

## API Endpoints

| Method | Endpoint      | Description         |
|--------|-------------|---------------------|
| GET    | `/users`     | Get all users      |
| POST   | `/users`     | Add a new user     |
| DELETE | `/users/:id` | Delete a user      |

## Features

✅ User list displayed dynamically  
✅ Ability to add users through a popup form  
✅ API-based backend with Express.js  
✅ Simple and clean UI with Angular  

---

This README provides a clear overview of the project, setup instructions, API documentation, and key features. Let me know if you need any updates! 🚀